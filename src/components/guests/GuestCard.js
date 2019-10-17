/*********************************

 File:       GuestCard.js
 Function:   Guest Card
 Copyright:  AppDelegates LLC
 Date:       2019-10-09
 Author:     mkahn

 **********************************/

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BlueSmiley from './bluesmiley256z256.png';
import GuestAvatar from "./GuestAvatar";
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: 30,
        width: 400
    },
    actionArea: {

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    headshot: {
        width: 64,
        height: 64,
        margin: 10
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const GuestCard = props => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card className={classes.card}>
            <GuestAvatar guest={props.guest} size="lg"/>
            <CardActionArea className={classes.actionArea} component={Link} to="/demos">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.guest.firstName} {props.guest.lastName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.guest.email}
                    </Typography>
                </CardContent>
            </div>
            </CardActionArea>
        </Card>
    );
}

GuestCard.propTypes = {
    guest: PropTypes.object.isRequired,
    to: PropTypes.string
}


export default GuestCard;
