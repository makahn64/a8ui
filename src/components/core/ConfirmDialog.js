/*********************************

 File:       ConfirmDialog.js
 Function:   Basic confirm dialog
 Copyright:  AppDelegates LLC
 Date:       2019-10-17
 Author:     mkahn



 **********************************/

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const ConfirmDialog = props => {

    const handleConfirm = () => {
        if (props.onConfirm) props.onConfirm();
    };

    const handleDecline = () => {
        if (props.onDecline) props.onDecline();
    };

    return (
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.heading}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       {props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDecline} color="primary">
                        {props.declinePrompt}
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        {props.confirmPrompt}
                    </Button>
                </DialogActions>
            </Dialog>
    );
}

ConfirmDialog.propTypes = {
    heading: PropTypes.string,
    confirmPrompt: PropTypes.string,
    declinePrompt: PropTypes.string,
    text: PropTypes.string,
    onConfirm: PropTypes.func,
    onDecline: PropTypes.func,
    open: PropTypes.bool
};

ConfirmDialog.defaultProps = {
    confirmPrompt: 'YES',
    declinePrompt: 'CANCEL',
    text: 'You good with that?',
    open: false
}

export default ConfirmDialog;
