import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
        // The header stays in view while a long table scrolls. Pass
        // sticky={false} for a table that should run the full page height.
        sticky = true,
        compact,
        // Accordion rows: getSubRows(item) lists the rows tucked under an item,
        // shown with the same columns when it's opened. getRowKey(item) names
        // the item; expandAll opens every one to start with.
        getSubRows,
        getRowKey = (item, index) => index,
        expandAll = false,
        expandLabel = () => 'Show more',
    } = props;

    const expandable = Boolean(getSubRows);
    const [expanded, setExpanded] = useState(() =>
        expandAll && data ? new Set(data.map(getRowKey)) : new Set(),
    );
    const toggle = (key) =>
        setExpanded((open) => {
            const next = new Set(open);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    return (
        <Box className={`table-responsive${sticky ? ' material-table-sticky' : ''}`}>
            <Paper className="material-table-paper-modern">
                <TableContainer>
                    <Table
                        sx={{ 
                            // `??` so a caller can pass 0 to let the table shrink to
                            // fit a phone; anything else keeps the 400px floor.
                            minWidth: minWidth ?? 400,
                            tableLayout: 'fixed',
                        }}
                        aria-label="data table"
                        stickyHeader={sticky}
                        className="material-table-modern"
                    >
                        <TableHead>
                            <TableRow>
                                {expandable && (
                                    <TableCell
                                        className="material-table-head-cell-modern material-table-expand-cell"
                                        sx={{
                                            backgroundColor: headerHex || '#800000',
                                            backgroundImage: !headerHex ? 'linear-gradient(135deg, #800000 0%, #5c0000 100%)' : 'none',
                                            width: 48,
                                            padding: 0,
                                        }}
                                    />
                                )}
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
                                data.map((item, rowIndex) => {
                                    const key = getRowKey(item, rowIndex);
                                    const subRows = expandable ? getSubRows(item) || [] : [];
                                    const isOpen = expandable && expanded.has(key);
                                    const cells = (row, rowKey) =>
                                        columns.map((col, colIndex) => (
                                            <TableCell
                                                key={`cell-${rowKey}-${colIndex}`}
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
                                                {renderCell(row, col)}
                                            </TableCell>
                                        ));

                                    return (
                                        <React.Fragment key={`row-${key}`}>
                                            <TableRow
                                                className={`material-table-row-modern${
                                                    subRows.length ? ' is-expandable' : ''
                                                }${isOpen ? ' is-open' : ''}`}
                                                // The whole row opens it, not just the arrow: a
                                                // big target on a phone. Links inside still work.
                                                onClick={
                                                    subRows.length
                                                        ? (event) => {
                                                              if (!event.target.closest('a, button')) toggle(key);
                                                          }
                                                        : undefined
                                                }
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
                                                {expandable && (
                                                    <TableCell className="material-table-expand-cell" sx={{ borderBottom: '1px solid #eee', padding: 0 }}>
                                                        {subRows.length > 0 && (
                                                            <IconButton
                                                                size="small"
                                                                className="material-table-expand-button"
                                                                aria-expanded={isOpen}
                                                                aria-label={expandLabel(item)}
                                                                onClick={() => toggle(key)}
                                                            >
                                                                <KeyboardArrowDownIcon fontSize="small" />
                                                            </IconButton>
                                                        )}
                                                    </TableCell>
                                                )}
                                                {cells(item, key)}
                                            </TableRow>
                                            {isOpen &&
                                                subRows.map((sub, subIndex) => (
                                                    <TableRow
                                                        key={`sub-${key}-${subIndex}`}
                                                        className="material-table-subrow"
                                                    >
                                                        <TableCell className="material-table-expand-cell" sx={{ borderBottom: '1px solid #eee' }} />
                                                        {cells(sub, `${key}-${subIndex}`)}
                                                    </TableRow>
                                                ))}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell 
                                        colSpan={columns.length + (expandable ? 1 : 0)} 
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
