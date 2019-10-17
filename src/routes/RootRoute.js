/*********************************

 File:       RootRoute.js
 Function:   Gathers up all the sub-route components
 Copyright:  AppDelegates
 Date:       2/24/2019
 Author:     mkahn

 **********************************/

import React from 'react';

import PropTypes from 'prop-types'
import MainPublicRoutes from './MainPublicRoutes';
import TestRoutes from './TestRoutes';
//import AdminRoutes from './AdminRoutes';


const RootRoute = props => {

    return (
        <div>
            <MainPublicRoutes/>
            <TestRoutes/>
        </div>
    )

}

RootRoute.propTypes = {
    //account: PropTypes.object.isRequired
}

export default RootRoute
