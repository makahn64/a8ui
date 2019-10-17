/*********************************

 File:       guest-api.js
 Function:   Calls regarding guests
 Copyright:  AppDelegates LLC
 Date:       2019-10-09
 Author:     mkahn



 **********************************/

import {jwtDELETE, jwtGET, jwtPOST} from './jwtRequest';
import {modelUrl, apiUrl} from "./url-base";
import {createBaseMethods} from './apiHelpers';

const MODEL_NAME = 'guests';
const baseMethods = createBaseMethods(MODEL_NAME);

export default  {
    ...baseMethods
}
