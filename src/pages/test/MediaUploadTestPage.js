/*********************************

 File:       MediaUploadTestPage.js
 Function:   What it says
 Copyright:  AppDelegates LLC
 Date:       2019-10-21
 Author:     mkahn



 **********************************/

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import a8api from "../../services/a8api";
import {withSnackbar} from "notistack";
import PageFrame from "../../components/navigation/PageFrameWithEditDelete";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ImageUploader from "../../components/image-uploaders/ImageUploader";

const MediaUploadTestPage = props => {

    const [ file, setFile ] = useState(null);

    function iUpChanged(file) {
        console.log(`File changed`)
        console.log(file);
        setFile(file);
    }

    async function  uploadThatShit(){
        console.log(`Uploading`)
        try {
            const media = await a8api.media.uploadMedia(file, {test:'yeah baby'});
            props.enqueueSnackbar(`Media saved: ${media.uuid}`, {variant: 'success'})
        } catch (err) {
            props.enqueueSnackbar(`Not cool: ${err.message}`, {variant: 'error'})
        }
    }

    return (
        <PageFrame heading="Media Upload Test">
            <Paper style={{padding: 20}}>
            <ImageUploader onChange={iUpChanged} fieldName="someField" imgHeight={480} imgWidth={640}
                           label="Media"
                           instructions="This is a test of image uploading and the layout of this component!"/>
                { file ? <Button variant="contained" color="primary" onClick={uploadThatShit}>Upload</Button>: null }
            </Paper>
        </PageFrame>
    );
};

MediaUploadTestPage.propTypes = {};

export default withSnackbar(MediaUploadTestPage);
