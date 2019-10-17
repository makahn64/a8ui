/*********************************

 File:       AddDemoContentPage.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-11
 Author:     mkahn



 **********************************/

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import A8Paper from "../../components/core/A8Paper";
import PageFrame from "../../components/navigation/PageFrame";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import demoHelpers from '../../services/demo';
import JSONPretty from "react-json-pretty";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));

const AddDemoContentPage = props => {

    const [ newGuests, setNewGuests ] = useState([]);

    const addRandomGuests = async () => {
        const newGuests = await demoHelpers.createFakeGuests(50);
        setNewGuests(newGuests);
    }

    const classes = useStyles();

    return (
        <PageFrame heading="Demos / Add Demo Content">
            <A8Paper>
                <Button variant="contained" color="primary" className={classes.button} onClick={addRandomGuests}>
                    Add 50 Random Guests
                </Button>
                <JSONPretty json={newGuests}/>
            </A8Paper>
        </PageFrame>
    );
};

AddDemoContentPage.propTypes = {};

export default AddDemoContentPage;
