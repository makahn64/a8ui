/*********************************

 File:       GuestAvatar.js
 Function:   Creates a guest avatar
 Copyright:  AppDelegates LLC
 Date:       2019-10-16
 Author:     mkahn



 **********************************/


import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import a8api from "../../services/a8api";
import {deepPurple} from "@material-ui/core/colors";

const useStyles = makeStyles({
    avatar: {
        margin: 10,
        backgroundColor: deepPurple[500]
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
        backgroundColor: deepPurple[500]
    },
});

const GuestAvatar = props => {
    const {headshot, firstName, lastName} = props.guest;
    const classes = useStyles();
    const avatarClass = (props.size === 'lg') ? classes.bigAvatar : classes.avatar;

    if (headshot && headshot.relPath) {
        // We have a valid headshot
        const imgPath = a8api.media.apiServerMediaUrlFor(headshot.relPath);
        return <Avatar src={imgPath} alt={`${firstName} ${lastName}`} className={avatarClass}/>
    }

    // No headshot, let's do initials
    const initials = `${firstName[0] || '?'}${lastName[0] || '?'}`.toUpperCase();
    return <Avatar className={avatarClass}>{initials}</Avatar>
}
;

GuestAvatar.propTypes = {
    guest: PropTypes.object.isRequired,
    size: PropTypes.string
};

export default GuestAvatar;
