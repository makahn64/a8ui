/*********************************

 File:       jwtRequest.js
 Function:   Enter brief description
 Copyright:  AppDelegates LLC
 Date:       1/9/19 8:50 PM
 Author:     mkahn

 **********************************/

import defaults from 'superagent-defaults';

export let jsonWebToken;
const jwtRequest = defaults();
export default jwtRequest;

export function setJwt(jwt){
    jsonWebToken = jwt;
    jwtRequest.set('Authorization', `Bearer ${jwt}`);
}

export function clearJwt(jwt){
    jsonWebToken = null;
    jwtRequest.unset('Authorization');
}

export const jwtGET = (url) => jwtRequest.get(url).then(resp=>resp.body);
export const jwtPOST = (url, json) => jwtRequest.post(url).send(json).then(resp => resp.body);
export const jwtMultipartPOST = url => jwtRequest.post(url);
export const jwtPUT = (url, json) => jwtRequest.put(url).send(json).then(resp => resp.body);
export const jwtPATCH = (url, json) => jwtRequest.patch(url).send(json).then(resp => resp.body);
export const jwtDELETE = url => jwtRequest.delete(url).then(resp => resp.body);
