import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import FlipClock from 'x-react-flipclock';

const SeasonCountdown = () => {
    const [today, setToday] = useState(new Date());
    const calcCountdownDay = () => {
        const today = new Date();
        return `${today.getFullYear()}-11-15 00:00:00`;
    };

    const renderContent = () => {
        const today = new Date();
        if (today.getMonth() >= 11 || today.getMonth() <= 1) {
            return (
                <Paper
                    className="season-countdown-paper"
                    variant="outline"
                >
                    <FlipClock
                        type="countdown"
                        count_to={today}
                        units={[
                            {
                                sep: '',
                                type: 'days',
                                title: 'days',
                            },
                            {
                                sep: ' ',
                                type: 'hours',
                                title: 'hours',
                            },
                            {
                                sep: ':',
                                type: 'minutes',
                                title: 'minutes',
                            },
                        ]}
                    />
                </Paper>
            );
        }
        return (
            <Paper
                className="season-countdown-paper"
                variant="outline"
            >
                <FlipClock
                    type="countdown"
                    count_to={calcCountdownDay()}
                    units={[
                        {
                            sep: '',
                            type: 'days',
                            title: 'days',
                        },
                        {
                            sep: ' ',
                            type: 'hours',
                            title: 'hours',
                        },
                        {
                            sep: ':',
                            type: 'minutes',
                            title: 'minutes',
                        },
                    ]}
                />
            </Paper>
        );
    };

    return renderContent();
};

export default SeasonCountdown;
