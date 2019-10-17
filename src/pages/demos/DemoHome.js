/*********************************

 File:       DemoHome.js
 Function:   Home Page for Demos
 Copyright:  AppDelegates LLC
 Date:       2019-10-10
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import A8Paper from "../../components/core/A8Paper";
import {Typography, makeStyles, Paper, Grid} from "@material-ui/core";
import PageFrame from "../../components/navigation/PageFrame";
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const DemoHome = props => {

    const classes = useStyles();

    return (
        <PageFrame heading="Demos">
            <Link to="demos/addcontent">Add demo content</Link>
            <A8Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12 yo</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                </Grid>
            </A8Paper>
        </PageFrame>

    );
};

DemoHome.propTypes = {

};

export default DemoHome;
