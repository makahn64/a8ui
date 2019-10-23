/*********************************

 File:       ExperienceConfigForm.js
 Function:   Adds/Edits an EC
 Copyright:  AppDelegates LLC
 Date:       2019-10-15
 Author:     mkahn

 **********************************/

import React, {useState, useRef} from 'react';
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
    name: '',
    key: '',
    completions: {},
    responseSubstitutions: {},
    metadata: {},
    image: {}
}

const ExperienceConfigForm = props => {

    const classes = useStyles();
    const [expConfig, setExpConfig] = useState(props.experienceConfig || INITIAL_STATE);
    const formRef = useRef();
    const { onAddComplete, onAddFailed } = props;

    const handleChange = field => event => {
        setExpConfig({...expConfig, [field]: event.target.value});
    };

    const handleSubmit = async () => {
        try {
            const newEC = await a8api.experienceConfig.createOrUpdate(expConfig);
            setExpConfig(INITIAL_STATE);
            props.enqueueSnackbar(`Experience configuration saved`, {variant: 'success'})
            if (onAddComplete) onAddComplete(newEC);
        } catch (err) {
            props.enqueueSnackbar('Experience configuration edit/add error!', {variant: 'error'});
            props.enqueueSnackbar(err.message, { variant: 'error'});
            if (onAddFailed) onAddFailed(err);
        }
    };

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
                            id="exp-name"
                            label="Experience Name"
                            className={classes.textField}
                            value={expConfig.name}
                            onChange={handleChange('name')}
                            margin="normal"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                    <Grid item>
                        <TextValidator
                            required
                            id="exp-key"
                            label="Experience Key"
                            className={classes.textField}
                            value={expConfig.key}
                            onChange={handleChange('key')}
                            margin="normal"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" className={classes.button} type="submit">
                    { props.experienceConfig ? 'SAVE' : 'ADD'}
                </Button>
            </Paper>
        </ValidatorForm>

    );
};

ExperienceConfigForm.propTypes = {
    onAddComplete: PropTypes.func,
    onAddFailed: PropTypes.func,
    experienceConfig: PropTypes.object
};

export default withSnackbar(ExperienceConfigForm);
