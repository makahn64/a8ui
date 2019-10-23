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
import GuestDetailPage from "../pages/guests/GuestDetailPage";
import ExperienceConfigDetailPage from "../pages/experiences/ExperienceConfigDetailPage";
import ExperienceDetailPage from "../pages/experiences/ExperienceDetailPage";
import ExperienceHomePage from "../pages/experiences/ExperiencesHomePage";
import MediaHomePage from "../pages/media/MediaHomePage";
import MediaDetailPage from "../pages/media/MediaDetailPage";



export default function MainPublicRoutes(props) {
    return (
        <Switch>
            <Route path="/" exact component={DashboardPage} />
            <Route path="/demos" exact component={DemoHomePage} />
            <Route path="/demos/addcontent" exact component={AddDemoContentPage} />
            <Route path="/guests" exact component={GuestHomePage}/>
            <Route path="/guests/:uuid" exact component={GuestDetailPage}/>
            <Route path="/experiences" exact component={ExperienceHomePage}/>
            <Route path="/experienceconfig/:uuid" exact component={ExperienceConfigDetailPage}/>
            <Route path="/experiences/:uuid" exact component={ExperienceDetailPage}/>
            <Route path="/media" exact component={MediaHomePage}/>
            <Route path="/media/:uuid" exact component={MediaDetailPage}/>

        </Switch>
    )
}
