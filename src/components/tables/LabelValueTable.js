/*********************************

 File:       LabelValueTable.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-22
 Author:     mkahn

 **********************************/

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, Table, TableCell, TableRow} from "@material-ui/core";

const useStyles = makeStyles({
    text: {
        fontSize: props => (props.fs || '0.7rem'),
        border: 'none'
    }
});

const LabelValueTable = props => {

    const {values} = props;
    const classes = useStyles(props);

    const rows = values.map(lv => (
        <TableRow className={classes.text}>
            <TableCell align="right" className={classes.text}>{lv.label}</TableCell>
            <TableCell align="left" className={classes.text}>{lv.value}</TableCell>
        </TableRow>
    ));

    return (
        <Fragment>
            <Table size="small">
                {rows}
            </Table>
        </Fragment>
    );
};

LabelValueTable.propTypes = {
    values: PropTypes.object,
    fs: PropTypes.string
};

export default LabelValueTable;
