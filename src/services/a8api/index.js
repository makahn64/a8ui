/*********************************

 File:       index.js
 Function:   index for Activ8or API Calls
 Copyright:  AppDelegates LLC
 Date:       2019-10-09
 Author:     mkahn


 **********************************/

import guests from './guest-api';
import experienceConfig from './experience-config-api';
import experiences from './experience-api';
import media from './media-api';

const a8api = {
    guests,
    experienceConfig,
    experiences,
    media
};

export default a8api;
