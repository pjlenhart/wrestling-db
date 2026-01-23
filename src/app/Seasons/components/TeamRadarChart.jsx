import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Tooltip,
    PointElement,
    Filler,
    RadialLinearScale,
    LineElement,
    Legend,
} from 'chart.js';
import Box from '@mui/material/Box';

ChartJS.register(
    RadialLinearScale,
    Tooltip,
    PointElement,
    LineElement,
    Filler,
    Legend
);

const TeamRadarChart = ({ stats, label = 'Team' }) => {
    if (!stats) return null;

    const labels = ['Takedowns', 'Reversals', 'Escapes', 'Near Falls', 'Penalties'];
    
    const teamData = [
        stats.takedowns_for || 0,
        stats.reversals_for || 0,
        stats.escapes_for || 0,
        stats.nearfall_for || 0,
        stats.penalties_for || 0,
    ];
    
    const opponentData = [
        stats.takedowns_against || 0,
        stats.reversals_against || 0,
        stats.escapes_against || 0,
        stats.nearfall_against || 0,
        stats.penalties_against || 0,
    ];

    const radarData = {
        labels: labels,
        datasets: [
            {
                label: label,
                backgroundColor: 'rgba(128, 0, 0, 0.2)',
                borderColor: '#800000',
                borderWidth: 2,
                pointBackgroundColor: '#800000',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#800000',
                pointHoverBorderColor: '#fff',
                data: teamData,
            },
            {
                label: 'Opponents',
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                borderColor: '#666',
                borderWidth: 2,
                pointBackgroundColor: '#666',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#666',
                pointHoverBorderColor: '#fff',
                data: opponentData,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12,
                        family: 'roboto-regular, sans-serif',
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    size: 13,
                    family: 'barlow, sans-serif',
                },
                bodyFont: {
                    size: 12,
                    family: 'roboto-regular, sans-serif',
                },
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            r: {
                pointLabels: {
                    font: {
                        size: 11,
                        family: 'roboto-regular, sans-serif',
                        weight: '600',
                    },
                    color: '#1a1a1a',
                },
                ticks: {
                    beginAtZero: true,
                    font: {
                        size: 10,
                    },
                    backdropColor: 'transparent',
                    color: '#666',
                },
                angleLines: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1,
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.08)',
                    circular: true,
                },
            },
        },
    };

    return (
        <Box className="team-radar-chart">
            <Radar data={radarData} options={radarOptions} />
        </Box>
    );
};

export default TeamRadarChart;

