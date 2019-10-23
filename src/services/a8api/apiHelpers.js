/*********************************

 File:       apiHelpers.js
 Function:   Helper functions for REST calls
 Copyright:  AppDelegates LLC
 Date:       1/9/19 10:31 PM
 Author:     mkahn

 **********************************/

import _ from 'lodash';
import {jwtDELETE, jwtGET, jwtPOST, jwtPATCH} from "./jwtRequest";
import {apiUrl, modelUrl} from "./url-base";

export function createBaseMethods(modelName) {
    const getAll = query => jwtGET(modelUrl(modelName, query));
    const get = uuid => jwtGET(apiUrl(`${modelName}/${uuid}`));
    const create = object => jwtPOST(apiUrl(modelName), object);
    const destroy = uuid => jwtDELETE(apiUrl(`${modelName}/${uuid}`));
    const modify = (uuid, newFields) => jwtPATCH(apiUrl(`${modelName}/${uuid}`), newFields);
    const createOrUpdate = (object) => {
        if (!object.uuid) {
            return jwtPOST(apiUrl(modelName), object);
        } else {
            return jwtPATCH(apiUrl(`${modelName}/${object.uuid}`), object);
        }
    };
    return { getAll, get, create, destroy, modify, createOrUpdate }
}

export function objArrayToIds(arr) {
    if (arr.length === 0 || _.isString(arr[0])) return arr;
    return arr.map(o => o.id);
}

export function objToId(obj) {
    if (_.isString(obj)) return obj;
    return obj.id;
}

export function depopulateField(fieldValue){
    if (!fieldValue) return null;
    if (_.isArray(fieldValue)){
        return objArrayToIds(fieldValue)
    } else {
        return objToId(fieldValue)
    }
}


/**
 *
 * @param postObj
 * @param arrayOfFieldNames
 * @returns {{[p: string]: *}}
 */
export function depopulateModel(postObj, arrayOfFieldNames){

    const rval = {...postObj};
    arrayOfFieldNames.forEach( field => {
        rval[field] = depopulateField(postObj[field])
    })

    return rval;

}
