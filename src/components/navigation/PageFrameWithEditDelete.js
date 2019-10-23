/*********************************

 File:       PageFrame.js
 Function:   Frame for pages needing edit/delete
 Copyright:  AppDelegates LLC
 Date:       2019-10-10
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import blue from '@material-ui/core/colors/blue';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    dbutton: {
        color: 'red'
    },
    ebutton: {
        color: blue[500]
    }
}));

const PageFrame = props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/*<AppBar position="static">*/}
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {props.heading}
                    </Typography>
                    { props.onDelete? <IconButton className={classes.dbutton} aria-label="delete" onClick={props.onDelete}>
                        <DeleteIcon />
                    </IconButton> : null }
                    { props.onEdit ? <IconButton className={classes.ebutton} aria-label="edit" onClick={props.onEdit}>
                        <EditIcon />
                    </IconButton> : null }
                </Toolbar>
            {props.children}
            {/*</AppBar>*/}
        </div>
    );
};

PageFrame.propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    heading: PropTypes.string
};

export default PageFrame;
