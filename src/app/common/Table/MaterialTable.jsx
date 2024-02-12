import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';

const MaterialTable = (props) => {
    const { columns, data, headerHex, headerFontColor } = props;

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    return (
        <Paper>
            <TableContainer>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={_.uniqueId()}
                                    align="center"
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
                        {data.map((item) => (
                            <TableRow
                                key={_.uniqueId()}
                                sx={{
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: '#D3D3D3',
                                    },
                                }}
                            >
                                {columns.map((col) => (
                                    <TableCell
                                        key={_.uniqueId()}
                                        sx={{
                                            [`&.${tableCellClasses.body}`]: {
                                                fontSize: 14,
                                                fontFamily: 'Baloo',
                                            },
                                        }}
                                        align="center"
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
