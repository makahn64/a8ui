/*********************************

 File:       ImageUploader.js
 Function:   Drag and Drop Image Uploader => Material-UI port
 Copyright:  AppDelegates LLC
 Date:       10/21/2019
 Author:     MAK


 **********************************/

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import a8api from '../../services/a8api';
import {Typography, Button, makeStyles, Grid} from "@material-ui/core";

const MAX_DISPLAY_WIDTH = 400;

const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        imgStyle: {
            width: 'auto', height: 'auto',
            maxWidth: MAX_DISPLAY_WIDTH,
            display: 'block',
            margin: '0 auto'
        },
        errorStyle: {
            padding: 5
        },
        sides: {
            padding: 10
        }
    }
));

const PlaceholderImage = ({width, height, label}) =>
    <svg width={width} height={height}>
        <rect width={width} height={height}
              style={{fill: 'rgb(200,200,200)', strokeWidth: 2, stroke: 'rgb(100,100,100'}}/>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
              style={{fill: 'white', font: `bold ${Math.floor(height / 10)}px sans-serif`}}>{label}
        </text>
    </svg>


const ImageUploader = props => {

    const classes = useStyles();

    const {
        imgWidth, imgHeight, initialImgMedia, onChange,
        fieldName, validate, aspectDeltaLimit, label,
        instructions, placeholderLabel
    } = props;

    const placeHolderSrc = null;//`https://via.placeholder.com/${imgWidth}x${imgHeight}`;
    const aspectRatio = imgWidth / imgHeight;

    // State
    const [hasMedia, setHasMedia] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [newImg, setNewImg] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    let initialImgSrc;

    // Should this be an effect?
    useEffect(() => {
        if (initialImgMedia instanceof File) {
            console.log("File at input to IU");
            fileDropped([initialImgMedia]);
            setHasMedia(true);
            setErrorMessage(false);
            setNewImg(null);
        } else {
            const baseName = initialImgSrc || (initialImgMedia && initialImgMedia.relPath);
            initialImgSrc = baseName ? a8api.media.apiServerMediaUrlFor(baseName) : placeHolderSrc;
            setImgSrc(initialImgSrc);
            setHasMedia(!!baseName);
            setErrorMessage(false);
            setNewImg(null);
        }
    }, []);


    function acceptFile(file, img) {
        setNewImg(img);
        setImgSrc(img.src);
        setHasMedia(true);
        setErrorMessage(false);
        if (onChange) onChange(file, fieldName);
    }


    const fileDropped = (accepted, rejected) => {

        console.log('files dropped: ' + JSON.stringify(accepted));
        console.log(accepted);

        const img = new Image();

        img.onload = () => {
            console.log("loaded");
            console.log(`Dims: ${img.width}x${img.height}`);

            switch (validate) {

                case 'exact':
                    const isExact = (img.width === imgWidth) && (img.height === imgHeight);
                    if (isExact) {
                        acceptFile(accepted[0], img);
                    } else {
                        setErrorMessage(`Image must be ${imgWidth}x${imgHeight}`);
                    }
                    break;

                case 'aspect':
                    const thisAspect = img.width / img.height;
                    const pctDelta = Math.abs(thisAspect - aspectRatio) / aspectRatio;
                    if (pctDelta <= aspectDeltaLimit) {
                        acceptFile(accepted[0], img);
                    } else {
                        setErrorMessage(`Aspect ratio (W/H) must be close to ${Number(aspectRatio).toFixed(2)} (image selected was ${Number(thisAspect).toFixed(2)})`);
                    }
                    break;

                default:
                    console.log(`No image validation requested.`);
                    acceptFile(accepted[0], img);
            }

        };

        img.src = window.URL.createObjectURL(accepted[0]);

    }

    const removeImage = () => {
        console.log('Removing image');
        setImgSrc(placeHolderSrc);
        setHasMedia(false);
        setErrorMessage(false);
        if (onChange) onChange(null, fieldName);
    }

    return (
        <Grid container spacing={5}>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Dropzone onDrop={fileDropped}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {imgSrc ?
                                            <img src={imgSrc} className={classes.imgStyle}/> :
                                            <PlaceholderImage width={imgWidth / 2} height={imgHeight / 2}
                                                              label={placeholderLabel || `${imgWidth}px x ${imgHeight}px`}/>}
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </Grid>
                    <Grid item>
                        {hasMedia ?
                            <Button color="secondary" onClick={removeImage}>REMOVE IMAGE</Button> : null}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Typography variant="h6">{label}</Typography>
                <Typography variant="body2">{instructions}</Typography>
                {errorMessage ?
                    <Typography color="error" variant="body2">{errorMessage}</Typography> : null}

            </Grid>
            {/*<JSONPretty json={this.state}/>*/}
        </Grid>
    );
};

ImageUploader.propTypes = {
    imgWidth: PropTypes.number,
    imgHeight: PropTypes.number,
    // Passing up a path on Media host (API host or other like S3)
    initialImgSrc: PropTypes.string,
    // String is usually "" for blank, new input, object for Media object, File for starting with a File (not implemented yet)
    initialImgMedia: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.instanceOf(File)
    ]),
    validate: PropTypes.string,
    aspectDeltaLimit: PropTypes.number,
    onChange: PropTypes.func,
    label: PropTypes.string,
    instructions: PropTypes.string,
    fieldName: PropTypes.string,
    placeholderLabel: PropTypes.string
};


ImageUploader.defaultProps = {
    width: 128,
    height: 128,
    aspectDeltaLimit: 0.1,
    label: 'Select Image',
    instructions: ''
};

export default ImageUploader;


