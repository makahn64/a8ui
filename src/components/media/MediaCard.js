/*********************************

 File:       MediaCard.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-17
 Author:     mkahn

 **********************************/


import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
    Card, CardActionArea, CardMedia,
    CardContent,
    Typography, CardActions, Button
} from "@material-ui/core";
import a8api from "../../services/a8api";
import LabelValueTable from "../tables/LabelValueTable";
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import {Link} from 'react-router-dom';


const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        minWidth: 345,
        margin: 10,
        backgroundColor: flags => {
            if (flags.inappropriate) return pink[50];
            if (flags.favorite) return green[50];
            return null;
        }
    },
    media: {
        height: 200,
    },
});

const MediaCard = props => {

    const {media} = props;
    const classes = useStyles(media.flags);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        props.onEdit(media);
        setAnchorEl(null);
    }

    const handleDelete = () => {
        props.onDelete(media);
        setAnchorEl(null);
    }

    const values = [
        {label: 'Created', value: new Date(media.createdAt).toUTCString()},
        {label: 'Size', value: `${(media.file.size / 1000000).toFixed(2)} Mbytes`},
        {label: 'Type', value: media.file.type},
        {label: 'Source', value: media.source}

    ]

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/media/${media.uuid}`}>
                {/*<Link to={`/media/${media.uuid}`}>*/}
                    <CardMedia
                        className={classes.media}
                        image={a8api.media.apiServerMediaUrlFor(media.relPath)}
                        title="Media"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <LabelValueTable values={values} fs="0.7rem"/>
                        </Typography>
                    </CardContent>
                {/*</Link>*/}
            </CardActionArea>
            {/*<CardActions style={{justifyContent: 'center'}}>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Details*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
};

MediaCard.propTypes = {
    media: PropTypes.object.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default MediaCard;

