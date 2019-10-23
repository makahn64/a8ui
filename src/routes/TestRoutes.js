/*********************************

 File:       TestRoutes.js
 Function:   ROutes related to test pages
 Copyright:  AppDelegates LLC
 Date:       11/24/18 10:11 PM
 Author:     mkahn


 **********************************/

import React from 'react';

import {
    Route,
    Switch} from 'react-router-dom'

import TestPage from "../pages/test/TestPage";
import MediaUploadTestPage from "../pages/test/MediaUploadTestPage";

export default function TestRoutes(props) {

    return (
        <Route path="/test" render={() => (
            <Switch>
                <Route path="/test/basic" component={TestPage}/>
                <Route path="/test/mediaupload" component={MediaUploadTestPage}/>
            </Switch>
        )}/>
    )
}
