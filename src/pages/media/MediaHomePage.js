/*********************************

 File:       MediaHomePage.js
 Function:   Home Page for Media Mgt
 Copyright:  AppDelegates LLC
 Date:       2019-10-10
 Author:     mkahn

 **********************************/

import React, {useEffect, useState} from 'react';
import {Typography, makeStyles} from "@material-ui/core";
import PageFrame from "../../components/navigation/PageFrame";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import a8api from "../../services/a8api";
import ExperienceConfigPanel from "../../components/experience-config/ExperienceConfigPanel";
import SortableExperienceTable from "../../components/experiences/SortableExperienceTable";
import ExperienceConfigForm from "../../components/experience-config/ExperienceConfigForm";
import _ from 'lodash';
import MediaCard from "../../components/media/MediaCard";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar/AppBar";
import AddMediaForm from "../../components/media/AddMediaForm";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
    holder: {
        marginTop: 30
    }
}));

const MediaHomePage = props => {

    const classes = useStyles();
    const [media, setMedia] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        async function getMedia() {
            const ms = await a8api.media.getAll();
            setMedia(ms);
        }

        getMedia();
    }, []);

    function handleAddClose() {
        setAddDialogOpen(false);
    }

    function handleMediaAdded(newMedia) {
        // prevent doubles on edit
        setMedia(_.uniqBy([newMedia, ...media], 'uuid'));
        setAddDialogOpen(false);
    }

    const mediaCards = media.map(m => <MediaCard media={m}/>);
    console.log(media);

    return (
        <PageFrame heading="Media">
            <Grid container>
            {mediaCards}
            </Grid>
            <Zoom
                in={true}
                timeout={300}
                style={{
                    transitionDelay: `100ms`,
                }}
                unmountOnExit
            >
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setAddDialogOpen(true)}>
                    <AddIcon/>
                </Fab>
            </Zoom>
            <Dialog fullScreen open={addDialogOpen} onClose={handleAddClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleAddClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add Media
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container className={classes.holder} justify="center">
                    <Grid item>
                        <AddMediaForm onMediaUploaded={handleMediaAdded}/>
                    </Grid>
                </Grid>
            </Dialog>
        </PageFrame>

    );
};


MediaHomePage.propTypes = {};

export default MediaHomePage;
