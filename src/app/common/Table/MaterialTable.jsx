import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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
        compact,
    } = props;

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    return (
        <Box className="table-responsive">
            <Paper className="material-table-paper-modern">
                <TableContainer>
                    <Table
                        sx={{ 
                            minWidth: minWidth || 400,
                            tableLayout: 'fixed',
                        }}
                        aria-label="data table"
                        stickyHeader={sticky}
                        className="material-table-modern"
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={`header-${index}`}
                                        align={column.align || alignHeaderCells || 'center'}
                                        className="material-table-head-cell-modern"
                                        sx={{
                                            backgroundColor: headerHex || '#800000',
                                            color: headerFontColor || 'white',
                                            fontFamily: 'barlow, sans-serif',
                                            fontWeight: 600,
                                            fontSize: compact ? '0.75rem' : '0.875rem',
                                            padding: compact ? '0.5rem' : '0.875rem 0.75rem',
                                            whiteSpace: 'nowrap',
                                            backgroundImage: !headerHex ? 'linear-gradient(135deg, #800000 0%, #5c0000 100%)' : 'none',
                                            width: column.width || 'auto',
                                            minWidth: column.minWidth || 'auto',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.map((item, rowIndex) => (
                                    <TableRow
                                        key={`row-${rowIndex}`}
                                        className="material-table-row-modern"
                                        sx={{
                                            backgroundColor: rowIndex % 2 !== 0 && !unstriped 
                                                ? '#f9f9f9' 
                                                : 'transparent',
                                            '&:hover': {
                                                backgroundColor: 'rgba(128, 0, 0, 0.04)',
                                            },
                                            '&:last-child td': {
                                                borderBottom: 0,
                                            },
                                        }}
                                    >
                                        {columns.map((col, colIndex) => (
                                            <TableCell
                                                key={`cell-${rowIndex}-${colIndex}`}
                                                align={col.align || alignCell || 'center'}
                                                sx={{
                                                    fontFamily: 'roboto-regular, sans-serif',
                                                    fontSize: compact ? '0.75rem' : '0.875rem',
                                                    padding: compact ? '0.5rem' : '0.75rem',
                                                    color: '#424242',
                                                    borderBottom: '1px solid #eee',
                                                    width: col.width || 'auto',
                                                    minWidth: col.minWidth || 'auto',
                                                }}
                                            >
                                                {renderCell(item, col)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell 
                                        colSpan={columns.length} 
                                        align="center"
                                        sx={{
                                            fontFamily: 'roboto-regular, sans-serif',
                                            color: '#757575',
                                            padding: '2rem',
                                        }}
                                    >
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default MaterialTable;
