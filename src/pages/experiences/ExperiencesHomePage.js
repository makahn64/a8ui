/*********************************

 File:       ExperiencesHomePage.js
 Function:   Home Page for Experience Mgt
 Copyright:  AppDelegates LLC
 Date:       2019-10-10
 Author:     mkahn

 **********************************/

import React, {useEffect, useState} from 'react';
import {Typography, makeStyles} from "@material-ui/core";
import PageFrame from "../../components/navigation/PageFrame";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import a8api from "../../services/a8api";
import ExperienceConfigPanel from "../../components/experience-config/ExperienceConfigPanel";
import SortableExperienceTable from "../../components/experiences/SortableExperienceTable";
import ExperienceConfigForm from "../../components/experience-config/ExperienceConfigForm";
import _ from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fab: {
        margin: theme.spacing(1),
        position: 'fixed',
        bottom: 80,
        right: 50
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const ExperiencesHome = props => {

    const classes = useStyles();
    const [addECDialogOpen, setAddECDialogOpen] = useState(false);
    const [econfToEdit, setEconfToEdit] = useState(null);

    const [expConfigs, setExpConfigs] = useState([]);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        async function getEm() {
            const ecs = await a8api.experienceConfig.getAll();
            setExpConfigs(ecs);
            const exps = await a8api.experiences.getAll();
            setExperiences(exps);
        }

        getEm();
    }, []);

    function handleECAddClose() {
        setAddECDialogOpen(false);
    }

    function handleECEdit(ec) {
        setEconfToEdit(ec);
        setAddECDialogOpen(true);
    }

    function handleECAdded(newEconf) {
        const newExpConfigs = _.uniqBy([newEconf, ...expConfigs], 'uuid');
        setExpConfigs(newExpConfigs);
        setAddECDialogOpen(false);
    }

    return (
        <PageFrame heading="Experiences">
            <ExperienceConfigPanel
                experienceConfigs={expConfigs}
                onECRequestDelete={(ec) => console.log(`top del req`)}
                onECRequestEdit={handleECEdit}/>
            <SortableExperienceTable experiences={experiences}/>
            <Dialog fullScreen open={addECDialogOpen} onClose={handleECAddClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleECAddClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            { econfToEdit ? "Edit Experience Configuration" : "New Experience Configuration"}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ExperienceConfigForm experienceConfig={econfToEdit}
                                      onAddFailed={handleECAddClose}
                                      onAddComplete={handleECAdded}/>
            </Dialog>
        </PageFrame>

    );
};



ExperiencesHome.propTypes = {};

export default ExperiencesHome;
