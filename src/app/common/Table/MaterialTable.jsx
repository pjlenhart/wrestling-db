import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import './MaterialTable.css';

const MaterialTable = (props) => {
    const {
        columns,
        data,
        headerHex,
        headerFontColor,
        unstriped,
        minWidth,
        alignCell,
        alignHeaderCells,
        sticky,
    } = props;

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    const tableStyle = {
        minWidth: minWidth || 550,
    };

    return (
        <Paper className="material-table-paper">
            <TableContainer>
                <Table
                    style={tableStyle}
                    aria-label="simple table"
                    stickyHeader
                    className="material-table"
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={_.uniqueId()}
                                    align={alignHeaderCells || 'center'}
                                    className="material-table-head-cell"
                                    style={{
                                        backgroundColor: headerHex || '#800000',
                                        color: headerFontColor || 'white',
                                    }}
                                    sx={{
                                        [`&.${tableCellClasses.head}`]: {
                                            backgroundColor:
                                                headerHex || '#800000',
                                            color: headerFontColor || 'white',
                                            fontSize: 14,
                                            fontFamily: 'Baloo',
                                        },
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={_.uniqueId()}
                                className={index % 2 !== 0 ? 'material-table-row-odd' : ''}
                                style={{
                                    backgroundColor: index % 2 !== 0 && !unstriped ? '#D3D3D3' : 'transparent',
                                }}
                            >
                                {columns.map((col) => (
                                    <TableCell
                                        key={_.uniqueId()}
                                        className="material-table-body-cell"
                                        align={alignCell || 'center'}
                                        sx={{
                                            [`&.${tableCellClasses.body}`]: {
                                                fontSize: 14,
                                                fontFamily: 'Baloo',
                                            },
                                        }}
                                    >
                                        {renderCell(item, col)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default MaterialTable;
