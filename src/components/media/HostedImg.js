/*********************************

 File:       HostedImg.js
 Function:   Acts like an <img> but source is hosted elsewhere (Sails, S3, etc.)
 Copyright:  AppDelegates LLC
 Date:       2019-03-13
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import a8api from "../../services/a8api";

const HostedImg = props => {

    const {host, src, media, hideIfNull, ...remainingProps} = props;
    if (hideIfNull && !(media || src)) return null;

    let actualSrc;

    if (!host || host === 'api-server') {
        if (media) {
            //const relPath = getFieldCoalesced(media, 'relPath')
            actualSrc = a8api.media.apiServerMediaUrlFor(media.relPath);
        } else {
            actualSrc = a8api.media.apiServerMediaUrlFor(src);
        }
    }

    const errHandler = props.fallback ? e => {
        e.target.onerror = null;
        e.target.src = `${props.fallback}`
    } : null;

    return (
        <img src={actualSrc}
             onError={errHandler}
             {...remainingProps}/>
    );
};

HostedImg.propTypes = {
    host: PropTypes.string,
    src: PropTypes.string,
    media: PropTypes.object,
    fallback: PropTypes.string,
    hideIfNull: PropTypes.bool
};

export default HostedImg;
