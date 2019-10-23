/*********************************

 File:       MediaDetalPage.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-10
 Author:     mkahn

 **********************************/

import React, {useEffect, useState} from 'react';
import {Paper, makeStyles, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox} from "@material-ui/core";
import PageFrame from "../../components/navigation/PageFrameWithEditDelete";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import a8api from "../../services/a8api";
import JSONDrawer from "../../components/core/JSONDrawer";
import HostedImg from "../../components/media/HostedImg";
import LabelValueTable from "../../components/tables/LabelValueTable";
import ConfirmDialog from "../../components/core/ConfirmDialog";
import {withSnackbar} from 'notistack';
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2)
    },
    fab: {
        margin: theme.spacing(1),
        position: 'fixed',
        bottom: 80,
        right: 50
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

const MediaHomePage = props => {

    const classes = useStyles();
    const [media, setMedia] = useState([]);
    const {uuid} = props.match.params;
    const [mediaSize, setMediaSize] = useState(null);
    const [values, setValues] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [goBack, setGoBack] = useState(false);

    useEffect(() => {
        async function getMedia() {
            const ms = await a8api.media.get(uuid);
            setMedia(ms);
            const size = await a8api.media.mediaImageSize(ms);
            setMediaSize(size);
            setValues([
                {label: 'Created', value: new Date(ms.createdAt).toUTCString()},
                {label: 'Size', value: `${(ms.file.size / 1000000).toFixed(2)} Mbytes`},
                {label: 'Dims', value: ms ? `${size.width} x ${size.height}` : null},
                {label: 'Type', value: ms.file.type}
            ]);
        }

        getMedia();
    }, []);

    async function handleDelete() {

        try {
            await a8api.media.destroy(media.uuid);
            props.enqueueSnackbar('Media deleted', {variant: "success"});
            setGoBack(true);
        } catch (e) {
            props.enqueueSnackbar('Media delete failed!', {variant: "error"});
            props.enqueueSnackbar(e.message, {variant: "error"});
        }
    }

    const handleChange = field => event => {
        console.log(`Flag changed ${field}`);
        const flags = {...media.flags}
        console.log(flags);
        console.log(event);
        flags[field] = event.target.checked;
        console.log(flags);
        setMedia({...media, flags});

        async function update() {
            await a8api.media.modify(media.uuid, {flags});
        }

        update();
    }

    if (goBack) return <Redirect to="/media"/>

    return (
        <PageFrame heading="Media Detail" onDelete={()=>setShowDeleteConfirm(true)}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <HostedImg media={media} style={{maxWidth: '80%'}}/>
                    </Grid>
                    <Grid item>
                        <LabelValueTable values={values} fs={`1em`}/>
                        {media.flags ?
                            <FormControl component="fieldset" className={classes.formControl} alignContent="left">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={media.flags.favorite}
                                                           onChange={handleChange('favorite')}/>}
                                        label="Favorite"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={media.flags.sticky}
                                                           onChange={handleChange('sticky')}/>}
                                        label="Sticky"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={media.flags.inappropriate}
                                                      onChange={handleChange('inappropriate')}/>
                                        }
                                        label="Inappropriate"
                                    />
                                </FormGroup>
                            </FormControl> : null}
                    </Grid>
                </Grid>
            </Paper>
            <JSONDrawer json={media} label={`Media JSON`}/>
            <ConfirmDialog
                text={`Do you really want to delete media ${media.uuid}? If this media is attached to experiences, guests, etc. this could cause problems!`}
                heading="Really Delete?"
                onConfirm={handleDelete} onDecline={() => setShowDeleteConfirm(false)}
                open={showDeleteConfirm}/>
        </PageFrame>

    );
};

MediaHomePage.propTypes = {};

export default withSnackbar(MediaHomePage);
