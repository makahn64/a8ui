/*********************************

 File:       SortableExperienceTable.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-16
 Author:     mkahn



 **********************************/

import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from "@material-ui/core/TextField";
import {fullExperienceFilter} from "../../services/helpers/filters";
import {Link} from 'react-router-dom'
import {Typography} from "@material-ui/core";


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
    {id: 'econfkey', numeric: false, disablePadding: true, label: 'Experience Config Key'},
    {id: 'name', numeric: false, disablePadding: true, label: 'Experience'},
    {id: 'email', numeric: false, disablePadding: false, label: 'Guest Email(s)'},
    {id: 'experiencedAt', numeric: false, disablePadding: false, label: 'Experienced At'}
];

function EnhancedTableHead(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    textField: {
        width: '50%',
        margin: '20px auto 50px auto',

    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchTermChanged(ev) {
        setSearchTerm(ev.target.value);
        props.searchTermCallback(ev.target.value);
    }

    return (
        <Toolbar className={classes.root}>
            <TextField
                id="gsearch-term"
                label="Search"
                className={classes.textField}
                value={searchTerm}
                onChange={handleSearchTermChanged}
                margin="normal"
            />
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    searchTermCallback: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2)
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const EnhancedTable = props => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const rows = fullExperienceFilter(props.experiences, searchTerm);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleClick = (event, id) => {
        console.log(`${id} clicked`);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const guests = exp => {
        if (!exp.guests || !exp.guests.length) return <span>No guests</span>;
        return <ul>
            { exp.guests.map(g=><li>{g.email}</li>) }
        </ul>
    }

    const searchTermChanged = newTerm => setSearchTerm(newTerm);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {props.experiences.length ?
                    <Fragment>
                        <EnhancedTableToolbar searchTermCallback={searchTermChanged}/>
                        <div className={classes.tableWrapper}>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size="medium"
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {stableSort(rows, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {

                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    component={Link}
                                                    to={`/experiences/${row.uuid}`}
                                                    style={{textDecoration: 'none'}}
                                                >
                                                    <TableCell align="left">
                                                        {row.configKey}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="left">{guests(row)}</TableCell>
                                                    <TableCell align="left">{row.experiencedAt}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Fragment> : <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        align="center">There are no experiences to display. Get busy!</Typography>}

            </Paper>
        </div>
    );
}

EnhancedTable.propTypes = {
    experiences: PropTypes.array.isRequired
}

export default EnhancedTable;
