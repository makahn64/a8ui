/*********************************

 File:       PageFrame.js
 Function:   Frame for every page
 Copyright:  AppDelegates LLC
 Date:       2019-10-10
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";

const PageFrame = props => {
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                {props.heading}
            </Typography>
            {props.children}
        </div>
    );
};

PageFrame.propTypes = {
    heading: PropTypes.string
};

export default PageFrame;
