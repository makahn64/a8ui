/*********************************

 File:       GuestHome.js
 Function:   Home Page for Guest Mgt
 Copyright:  AppDelegates LLC
 Date:       2019-10-10
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import A8Paper from "../../components/core/A8Paper";
import {Typography, makeStyles, Paper, Grid} from "@material-ui/core";
import PageFrame from "../../components/navigation/PageFrame";
import {Link} from 'react-router-dom';
import GuestAddForm from "../../components/guests/GuestAddForm";
import SortableGuestTable from "../../components/guests/SortableGuestTable";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import a8api from "../../services/a8api";

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
}));

const DemoHome = props => {

    const classes = useStyles();
    const [ addDialogOpen, setAddDialogOpen] = useState(false);
    const [ guests, setGuests ] = useState([])

    React.useEffect(() => {
        async function getGuests() {
            try {
                const guests = await a8api.guests.getAll();
                // Map is needed to make sort in the table cleaner
                setGuests(guests.map(g=>({...g, numExperiences: g.experiences.length})));
            } catch (err) {
                // FIXME sensible feedback needed
                console.error('could not ge guests')
            }
        }

        getGuests();

    }, [])

    function handleAddClose() {
        setAddDialogOpen(false);
    }

    function handleGuestAdded(newGuest){
        setGuests([...guests, newGuest]);
        setAddDialogOpen(false);
    }

    return (
        <PageFrame heading="Guests">
            <SortableGuestTable guests={guests}/>
            <Zoom
                in={true}
                timeout={300}
                style={{
                    transitionDelay: `100ms`,
                }}
                unmountOnExit
            >
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={()=>setAddDialogOpen(true)}>
                    <AddIcon/>
                </Fab>
            </Zoom>
            <Dialog fullScreen open={addDialogOpen} onClose={handleAddClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleAddClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add New Guest
                        </Typography>
                    </Toolbar>
                </AppBar>
                <GuestAddForm onAddComplete={handleGuestAdded} onAddFailed={handleAddClose}/>
            </Dialog>
        </PageFrame>

    );
};

/*


 <A8Paper>
                <GuestAddForm/>
            </A8Paper>
 */

DemoHome.propTypes = {};

export default DemoHome;
