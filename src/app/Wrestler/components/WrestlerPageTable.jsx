import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const WrestlerPageTable = (props) => {
    const { data, type } = props;

    const theme = createTheme({
        palette: {
            primary: {
                main: '#800000',
            },
            secondary: {
                main: '#000000',
            },
        },
    });
    const individualColumns = [
        {
            field: 'wrestler_name',
            headerName: 'Wrestler',
            width: 200,
            sortable: true,
            filterable: true,
        },
        {
            field: 'season',
            headerName: 'Season',
            width: 150,
            sortable: true,
            filterable: true,
        },
        {
            field: 'opponent_name',
            headerName: 'Opponent',
            width: 200,
            filterable: true,
        },
        {
            field: 'school_name',
            headerName: 'School',
            width: 200,
            sortable: true,
            filterable: true,
        },
        {
            field: 'weight_class',
            headerName: 'Weight Class',
            width: 150,
            filterable: true,
        },
        {
            field: 'match_date',
            headerName: 'Date',
            type: 'date',
            width: 150,
            filterable: true,
            type: 'date',
        },
        {
            field: 'tournament',
            headerName: 'Tournament',
            width: 300,
            sortable: true,
            filterable: true,
            valueGetter: (params) => params.row.match_stats.tournament,
        },
        {
            field: 'match_result',
            headerName: 'Result',
            width: 100,
            filterable: true,
        },
        {
            field: 'match_time',
            headerName: 'Match Time',
            width: 150,
            type: 'time',
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.match_time,
        },
        {
            field: 'points_for',
            headerName: 'Points For',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.points_for,
        },
        {
            field: 'points_against',
            headerName: 'Points Against',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.points_against,
        },
        {
            field: 'method_of_result',
            headerName: 'Method Of Result',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.method_of_result,
        },
        {
            field: 'period',
            headerName: 'Period',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.period,
        },
    ];

    const regularSeasonColumns = [
        {
            field: 'wrestler_name',
            headerName: 'Wrestler',
            width: 200,
            sortable: true,
            filterable: true,
        },
        {
            field: 'season',
            headerName: 'Season',
            width: 150,
            sortable: true,
            filterable: true,
        },
        {
            field: 'opponent_name',
            width: 200,
            headerName: 'Opponent',
            filterable: true,
        },
        {
            field: 'school_name',
            headerName: 'School',
            width: 200,
            sortable: true,
            filterable: true,
        },
        {
            field: 'weight_class',
            headerName: 'Weight Class',
            width: 200,
            filterable: true,
        },
        {
            field: 'match_date',
            headerName: 'Date',
            width: 200,
            filterable: true,
            type: 'date',
        },
        {
            field: 'match_result',
            headerName: 'Result',
            width: 150,
            filterable: true,
        },
        {
            field: 'match_time',
            headerName: 'Match Time',
            width: 150,
            type: 'time',
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.match_time,
        },
        {
            field: 'takedowns_for',
            headerName: 'Takedowns For',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.takedowns_for,
        },
        {
            field: 'takedowns_against',
            headerName: 'Takedowns Against',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.takedowns_against,
        },
        {
            field: 'reversals_for',
            headerName: 'Reversals For',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.reversals_for,
        },
        {
            field: 'reversals_against',
            headerName: 'Reversals Against',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.reversals_against,
        },
        {
            field: 'escapes_for',
            headerName: 'Escapes For',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.escapes_for,
        },
        {
            field: 'escapes_against',
            headerName: 'Escapes Against',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.escapes_against,
        },
        {
            field: 'nearfall_for',
            headerName: 'Near Falls For',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.nearfall_for,
        },
        {
            field: 'nearfall_against',
            headerName: 'Near Falls Against',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.nearfall_against,
        },
        {
            field: 'takedown_points_for',
            headerName: 'Takedown Points For',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.takedown_points_for,
        },
        {
            field: 'takedowns_points_against',
            headerName: 'Takedown Points Against',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) =>
                params.row.match_stats.takedown_points_against,
        },
        {
            field: 'reversal_points_for',
            headerName: 'Reversal Points For',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.reversal_points_for,
        },
        {
            field: 'reversal_points_against',
            headerName: 'Reversal Points Against',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) =>
                params.row.match_stats.reversal_points_against,
        },
        {
            field: 'escape_points_for',
            headerName: 'Escape Points For',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.escape_points_for,
        },
        {
            field: 'escape_points_against',
            headerName: 'Escape Points Against',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) =>
                params.row.match_stats.escape_points_against,
        },
        {
            field: 'nearfall_points_for',
            headerName: 'Near Fall Points For',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.nearfall_points_for,
        },
        {
            field: 'nearfall_points_against',
            headerName: 'Near Fall Points Against',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) =>
                params.row.match_stats.nearfall_points_against,
        },
        {
            field: 'penalties_for',
            headerName: 'Penalties For',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.penalties_for,
        },
        {
            field: 'penalties_against',
            headerName: 'Penalties Against',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.penalties_against,
        },
        {
            field: 'penalty_points_for',
            headerName: 'Penalty Points For',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.penalty_points_for,
        },
        {
            field: 'penalty_points_against',
            headerName: 'Penalty Points Against',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) =>
                params.row.match_stats.penalty_points_against,
        },
        {
            field: 'total_points_for',
            headerName: 'Total Points For',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.total_points_for,
        },
        {
            field: 'total_points_against',
            headerName: 'Total Points Against',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) =>
                params.row.match_stats.total_points_against,
        },
        {
            field: 'point_margin',
            headerName: 'Point Margin',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.point_margin,
        },
        {
            field: 'method_of_result',
            headerName: 'Method Of Result',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.method_of_result,
        },
        {
            field: 'period',
            headerName: 'Period',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.period,
        },
        {
            field: 'team_points_earned',
            headerName: 'Team Points Earned',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.match_stats.team_points_earned,
        },
    ];

    const renderTable = () => {
        return type === 'regularSeason' ? (
            <DataGrid
                sx={{
                    pl: 5,
                    boxShadow: 2,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 18,
                    border: 2,
                    borderColor: 'maroon',
                    '& .MuiDataGrid-row:hover': {
                        color: 'maroon',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                }}
                columns={regularSeasonColumns}
                rows={data}
                pageSize={20}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    panel: {
                        sx: {
                            '& .MuiTypography-root': {
                                color: 'black',
                                fontSize: 14,
                            },
                            '& .MuiDataGrid-filterForm': {
                                bgcolor: 'white',
                                color: 'maroon',
                            },
                            '& .MuiButton-text': {
                                color: 'maroon',
                            },
                        },
                    },
                }}
                checkboxSelection
                disableSelectionOnClick
            />
        ) : (
            <DataGrid
                sx={{
                    pl: 5,
                    boxShadow: 2,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 18,
                    border: 2,
                    borderColor: 'maroon',
                    '& .MuiDataGrid-row:hover': {
                        color: 'maroon',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                }}
                columns={individualColumns}
                rows={data}
                pageSize={20}
                components={{ Toolbar: GridToolbar }}
                checkboxSelection
                disableSelectionOnClick
            />
        );
    };

    return type === 'regularSeason' ? (
        <div style={{ height: 750, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <ThemeProvider theme={theme}>{renderTable()}</ThemeProvider>
            </div>
        </div>
    ) : (
        <div style={{ height: 1180, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <ThemeProvider theme={theme}>{renderTable()}</ThemeProvider>
            </div>
        </div>
    );
};

export default WrestlerPageTable;
