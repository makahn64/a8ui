/*********************************

 File:       TableFromModel.js
 Function:   Quickly displays a Table for a given Model and Schema
 Copyright:  AppDelegates LLC
 Date:       2019-10-21
 Author:     mkahn

 Schema is of the form:
 { <modelField> : {
    <label> : 'my label',
    <type> : ['json','timestamp','utctime','other/string']
  }}

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import JSONPretty from "react-json-pretty";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: theme.spacing(2)
    },
    table: {
        minWidth: 650,
    }
}));

const CellValue = props => {
    switch (props.type) {
        case 'json':
            return <JSONPretty json={props.value}/>
        case 'timestamp':
        case 'utctime':
            return new Date(props.value).toUTCString();
        case 'bool':
        case 'boolean':
            return props.value ? 'yes' : 'no';
        default:
            return <span>{props.value}</span>;
    }
}

const TableFromModel = props => {
    const classes = useStyles();

    const rows = Object.keys(props.schema).map( field => {
        return <TableRow key={field}>
            <TableCell component="th" scope="row">
                {props.schema[field].label}
            </TableCell>
            <TableCell>
                <CellValue type={props.schema[field].type} value={props.model[field]}/>
            </TableCell>
        </TableRow>
    })

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </Paper>
    );
};

TableFromModel.propTypes = {
    schema: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired
};

export default TableFromModel;
