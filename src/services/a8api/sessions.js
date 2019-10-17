/*********************************

 File:       sessions.js
 Function:   Enter brief description
 Copyright:  AppDelegates LLC
 Date:       1/9/19 8:55 PM
 Author:     mkahn

 Enter detailed description

 **********************************/

import {setJwt, clearJwt} from './jwtRequest'
import {ROOT_URL} from "./apipath";
import request from 'superagent';

const SessionAPI = {

    startSession: function (tokenId) {

        return request.post(`${ROOT_URL}/auth/session`)
            .send({token: tokenId})
            .then(response => {
                setJwt(response.body.token);
                return response.body;
            });

    },

    endSession: function () {

        return request.post(`${ROOT_URL}/auth/endsession`)
            .then(response => {
                clearJwt();
                return response.body;
            });

    },

}

export default SessionAPI;
