/*********************************

 File:       MainPublicRoutes.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       February 25, 2019
 Author:     mkahn


 **********************************/


import React from 'react';

import {
    Route,
    Switch
} from 'react-router-dom';

import DashboardPage from '../pages/dashboard/DashboardPage';
import DemoHomePage from "../pages/demos/DemoHome";
import AddDemoContentPage from "../pages/demos/AddDemoContentPage";
import GuestHomePage from "../pages/guests/GuestHome";




export default function MainPublicRoutes(props) {
    return (
        <Switch>
            <Route path="/" exact component={DashboardPage} />
            <Route path="/demos" exact component={DemoHomePage} />
            <Route path="/demos/addcontent" exact component={AddDemoContentPage} />
            <Route path="/guests" exact component={GuestHomePage}/>
        </Switch>
    )
}
