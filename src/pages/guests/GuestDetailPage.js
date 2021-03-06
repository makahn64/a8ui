/*********************************

 File:       GuestDetailPage.js
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

const GSCHEMA = {
    email: { label: 'Email', type: 'string'},
    firstName: { label: 'First Name', type: 'string'},
    lastName: { label: 'Last Name', type: 'string'},
    registeredAt: { label: 'Registered At', type: 'utctime'},
    mobilePhone: { label: 'Phone', type: 'string'},
    address: { label: 'Address', type: 'json'},
    experiences: { label: 'Experiences', type: 'json'}
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

const GuestDetailPage = props => {

    const classes = useStyles();
    const {uuid} = props.match.params;
    const [guest, setGuest] = useState(null);
    const [goEdit, setGoEdit] = useState(false);
    const [goGuestHome, setGoGuestHome] = useState(false);
    const [showDeleteConfirm, setDeleteConfirm] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);


    useEffect(() => {
        async function getGuest() {
            try {
                const g = await a8api.guests.get(uuid);
                setGuest(g);
            } catch (err) {
                props.enqueueSnackbar('Error fetching guest!', {variant: 'error'});
                props.enqueueSnackbar(err.message, {variant: 'error'});
            }
        }

        getGuest();
    }, [])

    function handleDelete() {
        async function delGuest() {
            try {
                await a8api.guests.destroy(guest.uuid);
                props.enqueueSnackbar('Guest deleted');
                setGoGuestHome(true);
            } catch (err) {
                props.enqueueSnackbar(err.message, {variant: 'error'});
                props.enqueueSnackbar('Error deleting guest!', {variant: 'error'});
                setDeleteConfirm(false);
            }
        }

        delGuest();
    }

    function handleEditClose() {
        setEditDialogOpen(false);
    }

    async function handleGuestEdited(editedGuest) {
        setGuest(editedGuest);
        setEditDialogOpen(false);
    }

    if (goGuestHome) return <Redirect to={`/guests`}/>;

    return (
        <PageFrame heading="Guests / Detail" onDelete={() => setDeleteConfirm(true)}
                   onEdit={() => setEditDialogOpen(true)}>
            {guest ?
                <div>
                    <Paper className={classes.paper}>
                    <TableFromModel schema={GSCHEMA} model={guest}/>
                    </Paper>
                    <Paper className={classes.paper}>
                        <JSONDrawer json={guest} label="Full Guest JSON"/>
                    </Paper>
                        <ConfirmDialog text={`Do you really want to delete guest ${guest.email}`}
                                   heading="Really Delete?"
                                   onConfirm={handleDelete} onDecline={() => setDeleteConfirm(false)}
                                   open={showDeleteConfirm}/>
                </div>
                : null}
            <Dialog fullScreen open={editDialogOpen} onClose={handleEditClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit Guest
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container className={classes.holder} justify="center">
                    <Grid item>
                        <GuestForm onAddComplete={handleGuestEdited} onAddFailed={handleEditClose}
                                   guest={guest}/>
                    </Grid>
                </Grid>
            </Dialog>
        </PageFrame>
    );
};

GuestDetailPage.propTypes = {};

export default withSnackbar(GuestDetailPage);
