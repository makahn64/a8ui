/*********************************

 File:       ExpConfigPanel.js
 Function:   Pop open panel for Experience Config Mgt
 Copyright:  AppDelegates LLC
 Date:       2019-10-17
 Author:     mkahn



 **********************************/

import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExperienceConfigCard from "./ExperienceConfigCard";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import {PropTypes} from "prop-types";
import {Chip} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: 'relative'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20
    }
}));

const ExperienceConfigPanel = props => {

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    function handleExpansion(ev, isOpenNow) {
        setIsOpen(isOpenNow);
    }

    function handleECRequestsDelete(ec) {
        console.log(`delete request for ${ec.name}`)
    }

    const ecs = props.experienceConfigs.map(ec => <ExperienceConfigCard expConfig={ec} key={ec.key}
                                                                        onEdit={() => props.onECRequestEdit(ec)
                                                                        }
                                                                        onDelete={() => props.onECRequestDelete(ec)}/>
    );

    return (
        <div className={classes.root}>
            <ExpansionPanel onChange={handleExpansion}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="subtitle1">Experience Configurations
                        <Chip label={props.experienceConfigs.length} size="small"
                              style={{marginLeft: 30}}/></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {ecs.length ? ecs :
                        <Typography variant="subtitle1" color="error" gutterBottom={true} style={{marginRight: 50}}>
                            There are no experience config entries. Click the button to add one.</Typography>}
                </ExpansionPanelDetails>
                <div className={classes.fab}>
                    <Zoom
                        in={isOpen}
                        timeout={300}
                        style={{
                            transitionDelay: `50ms`,
                        }}
                        unmountOnExit>
                        <Fab color="primary" aria-label="add" onClick={() => props.onECRequestEdit(null)} size="small">
                            <AddIcon/>
                        </Fab>
                    </Zoom>
                </div>
            </ExpansionPanel>

        </div>
    );
};

ExperienceConfigPanel.propTypes = {
    onECRequestEdit: PropTypes.func.isRequired,
    onECRequestDelete: PropTypes.func.isRequired,
    experienceConfigs: PropTypes.array.isRequired
};

export default ExperienceConfigPanel;

