/*********************************

 File:       ExperienceConfigCard.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-17
 Author:     mkahn



 **********************************/


import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardMedia, Avatar, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BoothIcon from '../../assets/images/tent001.svg';
import Blue from '@material-ui/core/colors/blue';


const useIconStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: Blue[300]
    },
    image: {
        width: 128,
        padding: 30,
        margin: '0 auto',
        display: 'block'
    }
}))

const ECIcon = props => {

    const classes = useIconStyles();

    return <div className={classes.root}>
        <img src={BoothIcon} className={classes.image}/>
    </div>

}

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 300,
        margin: 10
    },
    delbut: {
        color: 'red'
    }
}))

const ExperienceConfigCard = props => {

    const {expConfig} = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        console.log('edit')
        props.onEdit(expConfig);
        setAnchorEl(null);
    }

    const handleDelete = () => {
        console.log('delete')
        props.onDelete(expConfig);
        setAnchorEl(null);
    }

    return (
        <Card className={classes.root}>
            <CardMedia title={expConfig.name}>
                <ECIcon/>
            </CardMedia>
            <CardHeader
                avatar={
                    <Avatar aria-label="experiance config key" style={{fontSize: '0.7em', fontWeight: 'bold'}}>
                        {expConfig.key}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={expConfig.name}
                subheader=""
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete} className={classes.delbut}>Delete</MenuItem>
            </Menu>
        </Card>
    );
};

ExperienceConfigCard.propTypes = {
    expConfig: PropTypes.object.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default ExperienceConfigCard;

