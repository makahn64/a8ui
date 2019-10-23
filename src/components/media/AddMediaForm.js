/*********************************

 File:       AddMediaForm.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-22
 Author:     mkahn



 **********************************/

import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import a8api from "../../services/a8api";
import Paper from "@material-ui/core/Paper";
import ImageUploader from "../image-uploaders/ImageUploader";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {makeStyles} from "@material-ui/core";
import {withSnackbar} from "notistack";

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


const AddMediaForm = props => {

    const classes = useStyles();

    const [file, setFile] = useState(null);
    const [source, setSource] = useState('UI');
    const formRef = React.useRef();

    function iUpChanged(file) {
        console.log(file);
        setFile(file);
    }

    async function uploadMedia() {
        try {
            const media = await a8api.media.uploadMedia({file, source});
            props.enqueueSnackbar(`Media saved: ${media.uuid}`, {variant: 'success'})
            props.onMediaUploaded(media);
        } catch (err) {
            props.enqueueSnackbar(`Not cool: ${err.message}`, {variant: 'error'})
        }
    }

    return (
        <ValidatorForm
            ref={formRef}
            onSubmit={uploadMedia}
            onError={errors => console.log(errors)}
        >
            <Paper style={{padding: 20}}>
                <ImageUploader onChange={iUpChanged} fieldName="someField" imgHeight={480} imgWidth={640}
                               label="Media"
                               instructions="Add media through the UI by dragging and dropping. Any size can be added."
                               placeholderLabel="Drop Any Size Image"/>
                {file ? <Fragment>
                    <Grid container spacing={2}>
                        <Grid item>
                            <TextValidator
                                required
                                id="source"
                                label="Media Source"
                                className={classes.textField}
                                value={source}
                                onChange={ev => setSource(ev.target.value)}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">Upload</Button>
                </Fragment> : null}
            </Paper>
        </ValidatorForm>
    );
};

AddMediaForm.propTypes = {
    onMediaUploaded: PropTypes.func
}

export default withSnackbar(AddMediaForm);
