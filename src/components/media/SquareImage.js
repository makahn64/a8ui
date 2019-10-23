/*********************************

 File:       SquareImage.js
 Function:   Presents a Square Image
 Copyright:  AppDelegates LLC
 Date:       8/31/18 6:30 PM
 Author:     mkahn



 **********************************/


import React from 'react';
import PropTypes from 'prop-types';
import HostedImg from "./HostedImg";

const SquareImage = (props) => {

    const {src, media, width, margin, ...otherProps } = props;

    const w = width || 256;
    const marg = margin || 10;
    const imgStyle = { width: w, height: w, margin: marg };

    return  <HostedImg src={src} media={media} style={imgStyle} {...otherProps}/>


}

SquareImage.propTypes = {
    width: PropTypes.number,
    margin: PropTypes.number,
    media: PropTypes.object,
    src: PropTypes.string,
    fallback: PropTypes.string

};

export default SquareImage
