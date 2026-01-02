import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const WrestlerPageTable = (props) => {
    const { data, type } = props;

    const individualColumns = [
        {
            field: 'wrestler_name',
            headerName: 'Wrestler',
            width: 180,
            sortable: true,
            filterable: true,
        },
        {
            field: 'season',
            headerName: 'Season',
            width: 120,
            sortable: true,
            filterable: true,
        },
        {
            field: 'opponent_name',
            headerName: 'Opponent',
            width: 180,
            filterable: true,
        },
        {
            field: 'school_name',
            headerName: 'School',
            width: 180,
            sortable: true,
            filterable: true,
        },
        {
            field: 'weight_class',
            headerName: 'Weight',
            width: 100,
            filterable: true,
        },
        {
            field: 'match_date',
            headerName: 'Date',
            type: 'date',
            width: 120,
            filterable: true,
            valueGetter: (params) => new Date(params.row.match_date),
        },
        {
            field: 'tournament',
            headerName: 'Tournament',
            width: 250,
            sortable: true,
            filterable: true,
            valueGetter: (params) => params.row.match_stats.tournament,
        },
        {
            field: 'match_result',
            headerName: 'Result',
            width: 80,
            filterable: true,
        },
        {
            field: 'match_time',
            headerName: 'Time',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.match_time,
        },
        {
            field: 'points_for',
            headerName: 'Pts For',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.points_for,
        },
        {
            field: 'points_against',
            headerName: 'Pts Against',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.points_against,
        },
        {
            field: 'method_of_result',
            headerName: 'Method',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.method_of_result,
        },
        {
            field: 'period',
            headerName: 'Period',
            width: 80,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.period,
        },
    ];

    const regularSeasonColumns = [
        {
            field: 'wrestler_name',
            headerName: 'Wrestler',
            width: 150,
            sortable: true,
            filterable: true,
        },
        {
            field: 'season',
            headerName: 'Season',
            width: 110,
            sortable: true,
            filterable: true,
        },
        {
            field: 'opponent_name',
            width: 150,
            headerName: 'Opponent',
            filterable: true,
        },
        {
            field: 'school_name',
            headerName: 'School',
            width: 150,
            sortable: true,
            filterable: true,
        },
        {
            field: 'weight_class',
            headerName: 'Weight',
            width: 90,
            filterable: true,
        },
        {
            field: 'match_date',
            headerName: 'Date',
            width: 110,
            filterable: true,
            type: 'date',
            valueGetter: (params) => new Date(params.row.match_date),
        },
        {
            field: 'match_result',
            headerName: 'Result',
            width: 80,
            filterable: true,
        },
        {
            field: 'takedowns_for',
            headerName: 'TD For',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.takedowns_for,
        },
        {
            field: 'takedowns_against',
            headerName: 'TD Ag',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.takedowns_against,
        },
        {
            field: 'reversals_for',
            headerName: 'Rev For',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.reversals_for,
        },
        {
            field: 'reversals_against',
            headerName: 'Rev Ag',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.reversals_against,
        },
        {
            field: 'escapes_for',
            headerName: 'Esc For',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.escapes_for,
        },
        {
            field: 'escapes_against',
            headerName: 'Esc Ag',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.escapes_against,
        },
        {
            field: 'nearfall_for',
            headerName: 'NF For',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.nearfall_for,
        },
        {
            field: 'nearfall_against',
            headerName: 'NF Ag',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.nearfall_against,
        },
        {
            field: 'total_points_for',
            headerName: 'Total For',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.total_points_for,
        },
        {
            field: 'total_points_against',
            headerName: 'Total Ag',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.total_points_against,
        },
        {
            field: 'point_margin',
            headerName: 'Margin',
            width: 90,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.point_margin,
        },
        {
            field: 'method_of_result',
            headerName: 'Method',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.method_of_result,
        },
        {
            field: 'period',
            headerName: 'Period',
            width: 80,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.period,
        },
        {
            field: 'team_points_earned',
            headerName: 'Team Pts',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.team_points_earned,
        },
    ];

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
                rows={data}
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
            />
        );
    };

    const height = type === 'regularSeason' ? 800 : 600;

    return (
        <Box className="table-responsive" sx={{ width: '100%' }}>
            <Box sx={{ height, width: '100%' }}>
                {renderTable()}
            </Box>
        </Box>
    );
};

export default WrestlerPageTable;
