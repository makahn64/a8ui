/*********************************

 File:       media-api.js
 Function:   Calls regarding media
 Copyright:  AppDelegates LLC
 Date:       2019-10-09
 Author:     mkahn



 **********************************/

import {jwtDELETE, jwtGET, jwtPOST} from './jwtRequest';
import {modelUrl, API_SERVER_BASE} from "./url-base";
import {createBaseMethods} from './apiHelpers';

const MODEL_NAME = 'guests';
const baseMethods = createBaseMethods(MODEL_NAME);

const apiServerMediaUrlFor = relativeUrl => `${API_SERVER_BASE}${relativeUrl}`

/**
 * Accepts a standard media Object which includes a relPath that Sails maps to a downloads folder
 * @param {object} mediaObject
 * @param {string} placeholder - Full path to a placeholder image (not relative) if mediaObj or mediaObj.relPath are null
 * @returns {string}
 */
const apiServerMediaUrlFromMediaObject = (mediaObject, placeholder) => {
    if (!(mediaObject && mediaObject.relPath)) return placeholder;
    return `${API_SERVER_BASE}${mediaObject.relPath}`;
}

const mediaDownloadUrl = id => {
    if (!id) return null;
    return modelUrl('media') + `/${id}`;
}


const uploadMedia = async file => {
    const fd = new FormData();
    fd.append('file', file);
    return jwtPOST(modelUrl('media'))
        .send(fd)
        .then(data => data.body);
}

export default {
    ...baseMethods,
    apiServerMediaUrlFor,
    apiServerMediaUrlFromMediaObject,
    mediaDownloadUrl,
    uploadMedia
}
