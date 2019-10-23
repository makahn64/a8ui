/*********************************

 File:       ExperienceDetailPage.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-16
 Author:     mkahn



 **********************************/

import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import a8api from "../../services/a8api";
import {withSnackbar} from "notistack";
import PageFrame from "../../components/navigation/PageFrameWithEditDelete";
import IconButton from "@material-ui/core/IconButton";
import {Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ConfirmDialog from "../../components/core/ConfirmDialog";
import AppBar from "@material-ui/core/AppBar/AppBar";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import GuestForm from "../../components/guests/GuestForm";
import Grid from "@material-ui/core/Grid";
import TableFromModel from "../../components/tables/TableFromModel";
import JSONDrawer from "../../components/core/JSONDrawer";
import Paper from "@material-ui/core/Paper";

const TSCHEMA = {
    name: { label: 'Experience Name', type: 'string'},
    configKey: { label: 'Experience Config Key', type: 'string'},
    experiencedAt: { label: 'Experienced At', type: 'utctime'},
    completed: { label: 'Experience Complete?', type: 'bool'},
    guests: { label: 'Guests', type: 'json'},
    media: { label: 'Media', type: 'json'},
    metadata: { label: 'Metadata', type: 'json'},
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        position: 'relative',
    },
    holder: {
        marginTop: 30
    },
    form: {
        margin: '0 auto'
    },
    paper: {
        margin: 10
    }
}));

const ExperienceDetailPage = props => {

    const classes = useStyles();
    const {uuid} = props.match.params;
    const [exp, setExp] = useState(null);
    const [goExpHome, setGoExpHome] = useState(false);
    const [showDeleteConfirm, setDeleteConfirm] = useState(false);


    useEffect(() => {
        async function getExp() {
            try {
                const e = await a8api.experiences.get(uuid);
                setExp(e);
            } catch (err) {
                props.enqueueSnackbar('Error fetching experience!', {variant: 'error'});
                props.enqueueSnackbar(err.message, {variant: 'error'});
            }
        }

        getExp();
    }, [])

    function handleDelete() {
        async function delExp() {
            try {
                await a8api.experiences.destroy(exp.uuid);
                props.enqueueSnackbar('Guest deleted');
                setGoExpHome(true);
            } catch (err) {
                props.enqueueSnackbar(err.message, {variant: 'error'});
                props.enqueueSnackbar('Error deleting guest!', {variant: 'error'});
                setDeleteConfirm(false);
            }
        }

        delExp();
    }

    // may add in future rev

    // function handleEditClose() {
    //     setEditDialogOpen(false);
    // }

    // async function handleGuestEdited(editedGuest) {
    //     setGuest(editedGuest);
    //     setEditDialogOpen(false);
    // }

    if (goExpHome) return <Redirect to={`/experiences`}/>;

    return (
        <PageFrame heading="Experience / Detail" onDelete={() => setDeleteConfirm(true)}>
            {exp ?
                <div>
                    <Paper className={classes.paper}>
                    <TableFromModel schema={TSCHEMA} model={exp}/>
                    </Paper>
                    <Paper className={classes.paper}>
                        <JSONDrawer json={exp} label="Full Experience JSON"/>
                    </Paper>
                        <ConfirmDialog text={`Do you really want to delete experience?`}
                                   heading="Really Delete?"
                                   onConfirm={handleDelete} onDecline={() => setDeleteConfirm(false)}
                                   open={showDeleteConfirm}/>
                </div>
                : null}
            {/*<Dialog fullScreen open={editDialogOpen} onClose={handleEditClose} TransitionComponent={Transition}>*/}
            {/*    <AppBar className={classes.appBar}>*/}
            {/*        <Toolbar>*/}
            {/*            <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="close">*/}
            {/*                <CloseIcon/>*/}
            {/*            </IconButton>*/}
            {/*            <Typography variant="h6" className={classes.title}>*/}
            {/*                Edit Guest*/}
            {/*            </Typography>*/}
            {/*        </Toolbar>*/}
            {/*    </AppBar>*/}
            {/*    <Grid container className={classes.holder} justify="center">*/}
            {/*        <Grid item>*/}
            {/*            <GuestForm onAddComplete={handleGuestEdited} onAddFailed={handleEditClose}*/}
            {/*                       guest={guest}/>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Dialog>*/}
        </PageFrame>
    );
};

ExperienceDetailPage.propTypes = {};

export default withSnackbar(ExperienceDetailPage);
