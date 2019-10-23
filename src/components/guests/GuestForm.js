/*********************************

 File:       GuestForm.js
 Function:   Add/Edit a guest
 Copyright:  AppDelegates LLC
 Date:       2019-10-15
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import a8api from '../../services/a8api';
import { withSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10,
        width: 500
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        width: 200
    },
    textFieldEmail: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        marginTop: theme.spacing(3)
    }

}));

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    experiences: [] // needed for table chip to properly show count before a reload
}

const GuestForm = props => {

    const classes = useStyles();
    const [guest, setGuest] = React.useState(props.guest || INITIAL_STATE);
    const formRef = React.useRef();
    const { onAddComplete, onAddFailed } = props;

    const handleChange = field => event => {
        setGuest({...guest, [field]: event.target.value});
    };

    const handleSubmit = async () => {
        try {
            const newG = await a8api.guests.createOrUpdate(guest);
            props.enqueueSnackbar('Guest saved', {variant: 'success'})
            if (onAddComplete) onAddComplete(newG);

        } catch (err) {
            props.enqueueSnackbar('Guest save error!', {variant: 'error'});
            props.enqueueSnackbar(err.message, { variant: 'error'});
            if (onAddFailed) onAddFailed(err);
        }
    }

    return (
        <ValidatorForm
            ref={formRef}
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
        >
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextValidator
                            required
                            id="first-name"
                            label="First Name"
                            className={classes.textField}
                            value={guest.firstName}
                            onChange={handleChange('firstName')}
                            margin="normal"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                    <Grid item>
                        <TextValidator
                            required
                            id="last-name"
                            label="Last Name"
                            className={classes.textField}
                            value={guest.lastName}
                            onChange={handleChange('lastName')}
                            margin="normal"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <TextValidator
                            required
                            className={classes.textFieldEmail}
                            label="Email"
                            onChange={handleChange('email')}
                            name="email"
                            value={guest.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                    </Grid>
                </Grid>

                <Button variant="contained" color="primary" className={classes.button} type="submit">
                    { props.guest.uuid? 'SAVE' : 'ADD GUEST' }
                </Button>
            </Paper>
        </ValidatorForm>

    );
};

GuestForm.propTypes = {
    onAddComplete: PropTypes.func,
    onAddFailed: PropTypes.func,
    guest: PropTypes.object
};

export default withSnackbar(GuestForm);
