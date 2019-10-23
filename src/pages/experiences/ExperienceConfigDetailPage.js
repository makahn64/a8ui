/*********************************

 File:       GuestDetailPage.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-16
 Author:     mkahn



 **********************************/

import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import a8api from "../../services/a8api";
import {withSnackbar} from "notistack";
import PageFrame from "../../components/navigation/PageFrameWithEditDelete";
import JSONPretty from "react-json-pretty";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {Toolbar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ConfirmDialog from "../../components/core/ConfirmDialog";


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
}));

const GuestDetailPage = props => {

    const classes = useStyles();
    const {uuid} = props.match.params;
    const [guest, setGuest] = useState(null);
    const [goEdit, setGoEdit] = useState(false);
    const [goGuestHome, setGoGuestHome] = useState(false);
    const [showDeleteConfirm, setDeleteConfirm] = useState(false);

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
        async function delGuest(){
            try {
                await a8api.guests.destroy(guest.uuid);
                props.enqueueSnackbar('Guest deleted');
                setGoGuestHome(true);
            } catch (err) {
                props.enqueueSnackbar(err.message, { variant: 'error'});
                props.enqueueSnackbar('Error deleting guest!', { variant: 'error'});
                setDeleteConfirm(false);
            }
        }

        delGuest();
    }

    if (goEdit) return <Redirect to={`/guests/${guest.uuid}/edit`}/>;
    if (goGuestHome) return <Redirect to={`/guests`}/>;

    return (
        <PageFrame heading="Guests / Detail" onDelete={() => setDeleteConfirm(true)} onEdit={() => setGoEdit(true)}>
            {guest ?
                <div>
                    <JSONPretty json={guest}/>
                    <ConfirmDialog text={`Do you really want to delete guest ${guest.email}`}
                                   heading="Really Delete?"
                                   onConfirm={handleDelete} onDecline={() => setDeleteConfirm(false)}
                                   open={showDeleteConfirm}/>
                </div>
                : null}
        </PageFrame>
    );
};

GuestDetailPage.propTypes = {};

export default withSnackbar(GuestDetailPage);
