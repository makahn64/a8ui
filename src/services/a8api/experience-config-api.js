/*********************************

 File:       experience-config-api.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-11
 Author:     mkahn



 **********************************/

import {createBaseMethods} from './apiHelpers';

const MODEL_NAME = 'experienceconfig';
const baseMethods = createBaseMethods(MODEL_NAME);

export default  {
    ...baseMethods
}
