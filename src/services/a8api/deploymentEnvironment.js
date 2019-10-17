/*********************************

 File:       deploymentEnvironment.js
 Function:   Grabs and exports the UI's REST API environment
 Copyright:  AppDelegates LLC
 Date:       1/9/19 8:39 PM
 Author:     mkahn

 **********************************/

import request from 'superagent'
import {ROOT_URL} from './apipath';
let deploymentEnvironment;

const depEnv = {

    fetchDeploymentEnvironment: () => {
        return request
            .get(`${ROOT_URL}/environment`)
            .then(resp => {
                deploymentEnvironment = resp.body;
                return resp.body;
            });

    },

    currentEnvironment: () => deploymentEnvironment

}

export default depEnv;
