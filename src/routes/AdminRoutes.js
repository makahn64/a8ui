/*********************************

 File:       AdminRoutes.js
 Function:   Routes related to the Admin Menu
 Copyright:  Hrbr
 Date:       1/10/19
 Author:     mkahn


 **********************************/

import React from 'react';

import {
    Route,
    Switch
} from 'react-router-dom'

import AdminEnvironmentPage from 'pages/admin/AdminEnvironmentPage'
import AdminOrgDetailPage from 'pages/organizations/AdminOrgDetailPage'
import AdminOrgListPage from 'pages/organizations/AdminOrgListPage'
import AdminUserDetailPage from 'pages/admin/AdminUserDetailPage'
import AdminUserMgtPage from 'pages/admin/AdminUserMgtPage'
import OrgEditPage from 'pages/organizations/OrganizationEditPage'

export default function AdminRoutes(props) {
    return (
        <Route path="/a" render={() => (
            <Switch>
                <Route path="/a/environment" component={AdminEnvironmentPage}/>
                <Route path="/a/orgs" render={ () => (
                    <Switch>
                        <Route path="/a/orgs/details/:orgid" component={AdminOrgDetailPage}/>
                        <Route path="/a/orgs/edit/:id" component={OrgEditPage}/>
                        <Route path="/a/orgs/list" component={AdminOrgListPage}/>
                    </Switch>

                )}/>
                <Route path="/a/users" component={() => (
                    <Switch>
                        <Route path="/a/users/details/:id" component={AdminUserDetailPage}/>
                        <Route path="/a/users/list" component={AdminUserMgtPage}/>
                    </Switch>
                )}/>
            </Switch>
        )}/>
    )
}
