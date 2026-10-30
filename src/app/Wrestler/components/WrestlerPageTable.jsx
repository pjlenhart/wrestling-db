import React, { useMemo } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import '../../common/Table/MaterialTable.css';
import { parseCalendarDate } from '../../common/dates';
import { useScoresheetColumn } from '../../LiveScoresheet/components/ScoresheetDialog';
import { videoColumn } from '../../common/video/VideoLink';
import { methodColumn, newestFirst, scoreColumn } from '../../common/boutColumns';

const WrestlerPageTable = (props) => {
    const { data, type } = props;
    // A career reads best from the latest bout back.
    const rows = useMemo(() => newestFirst(data), [data]);
    // Video, then Scoresheet, lead every bout table right after the selection
    // checkboxes. The scoring breakdown, period and fall time live in the
    // scoresheet (or the match summary it opens), so the table stays narrow.
    // It's all one wrestler's bouts, so there's no Wrestler column.
    const { column: scoresheetColumn, dialog: scoresheetDialog } = useScoresheetColumn();

    const leadingColumns = [
        videoColumn,
        scoresheetColumn,
        {
            field: 'season',
            headerName: 'Season',
            width: 110,
        },
        {
            field: 'opponent_name',
            headerName: 'Opponent',
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'school_name',
            headerName: 'School',
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'weight_class',
            headerName: 'Weight',
            width: 80,
        },
        {
            field: 'match_date',
            headerName: 'Date',
            type: 'date',
            width: 105,
            valueGetter: (params) => parseCalendarDate(params.row.match_date),
        },
    ];

    const resultColumns = [
        {
            field: 'match_result',
            headerName: 'Result',
            width: 75,
        },
        scoreColumn,
        methodColumn,
    ];

    const individualColumns = [
        ...leadingColumns,
        {
            field: 'tournament',
            headerName: 'Tournament',
            minWidth: 170,
            flex: 1.5,
            valueGetter: (params) => params.row.match_stats.tournament,
        },
        ...resultColumns,
    ];

    const regularSeasonColumns = [...leadingColumns, ...resultColumns];

    const gridStyles = {
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        fontFamily: 'roboto-regular, sans-serif',
        fontSize: 14,
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#800000',
            color: 'white',
            fontFamily: 'barlow, sans-serif',
            fontWeight: 600,
            fontSize: 13,
        },
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
        },
        '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(128, 0, 0, 0.04)',
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#fafafa',
        },
        '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
        },
        '& .MuiDataGrid-toolbarContainer': {
            padding: '0.75rem',
            gap: '0.5rem',
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-root': {
            color: '#800000',
            fontFamily: 'roboto-regular, sans-serif',
        },
        '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #f0f0f0',
        },
        '& .MuiTablePagination-root': {
            fontFamily: 'roboto-regular, sans-serif',
        },
        '& .MuiCheckbox-root': {
            color: '#800000',
        },
        '& .MuiCheckbox-root.Mui-checked': {
            color: '#800000',
        },
    };

    const renderTable = () => {
        const columns = type === 'regularSeason' ? regularSeasonColumns : individualColumns;
        
        return (
            <DataGrid
                sx={gridStyles}
                columns={columns}
                rows={rows}
                pageSize={20}
                rowsPerPageOptions={[10, 20, 50]}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    panel: {
                        sx: {
                            '& .MuiTypography-root': {
                                color: '#1a1a1a',
                                fontSize: 14,
                                fontFamily: 'roboto-regular, sans-serif',
                            },
                            '& .MuiDataGrid-filterForm': {
                                bgcolor: 'white',
                            },
                            '& .MuiButton-text': {
                                color: '#800000',
                            },
                        },
                    },
                }}
                checkboxSelection
                disableSelectionOnClick
                density="comfortable"
                autoHeight
            />
        );
    };

    return (
        <Box className="bout-grid-frame">
            {renderTable()}
            {scoresheetDialog}
        </Box>
    );
};

export default WrestlerPageTable;
