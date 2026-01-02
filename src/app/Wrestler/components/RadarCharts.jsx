import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    PointElement,
    Filler,
    RadialLinearScale,
    LineElement,
    Legend,
} from 'chart.js';
import Box from '@mui/material/Box';

const RadarChart = (props) => {
    const { chartData } = props;

    ChartJS.register(
        RadialLinearScale,
        Tooltip,
        PointElement,
        LineElement,
        Filler,
        Legend
    );

    const dataSet = !chartData
        ? null
        : {
              you: [
                  { title: 'TD', value: chartData[0]?.takedowns_for },
                  { title: 'Rev', value: chartData[0]?.reversals_for },
                  { title: 'Esc', value: chartData[0]?.escapes_for },
                  { title: 'NF', value: chartData[0]?.near_falls_for },
                  { title: 'Pen', value: chartData[0]?.penalties_for },
              ],
              opponents: [
                  { title: 'TD', value: chartData[0]?.takedowns_against },
                  { title: 'Rev', value: chartData[0]?.reversals_against },
                  { title: 'Esc', value: chartData[0]?.escapes_against },
                  { title: 'NF', value: chartData[0]?.near_falls_against },
                  { title: 'Pen', value: chartData[0]?.penalties_against },
              ],
          };

    // Use abbreviated labels for more space
    const labels = ['Takedowns', 'Reversals', 'Escapes', 'Near Falls', 'Penalties'];
    
    const youData = [];
    dataSet?.you.map((item) => {
        youData.push(item.value);
    });
    const opponentData = [];
    dataSet?.opponents.map((item) => {
        opponentData.push(item.value);
    });

    const radarData = {
        labels: labels,
        datasets: [
            {
                label: chartData[0]?.wrestler_name || 'Wrestler',
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
                data: youData,
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
                    stepSize: 5,
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
        <Box className="wrestler-radar-chart-modern">
            <Radar data={radarData} options={radarOptions} />
        </Box>
    );
};

export default RadarChart;
