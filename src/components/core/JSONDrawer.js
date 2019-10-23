/*********************************

 File:       JSONDrawer.js
 Function:   Pop Open Drawer for Large Object Json
 Copyright:  AppDelegates LLC
 Date:       2019-10-21
 Author:     mkahn



 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import JSONPretty from "react-json-pretty";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: 'relative'
    }
}));

const JSONDrawer = props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="subtitle1">{props.label}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <JSONPretty json={props.json} style={{width: '100%'}}/>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

JSONDrawer.propTypes = {
    json: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired
};

export default JSONDrawer;
