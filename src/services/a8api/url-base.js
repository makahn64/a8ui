/*********************************

 File:       url-base.js
 Function:   What is the base URL for the API?
 Copyright:  AppDelegates LLC
 Date:       8/14/2018
 Author:     MAK

 **********************************/

export const API_SERVER_PORT = 1337;

export const API_SERVER_BASE = `http://127.0.0.1:${API_SERVER_PORT}`;

export const REST_API_ROOT_URL = window.location.href.indexOf('localhost') > 0 ? API_SERVER_BASE : '/';

export function modelUrl(modelName, query) {
    return (!query ? `${REST_API_ROOT_URL}/${modelName}` : `${REST_API_ROOT_URL}/${modelName}?${query}`);
}

export function apiUrl(basePath) {
    const normalizedBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
    return `${REST_API_ROOT_URL}${normalizedBasePath}`;
}
