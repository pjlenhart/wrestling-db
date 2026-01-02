import React, { useMemo } from 'react';
import MaterialTable from '../../common/Table/MaterialTable';
import '../styles/matchStyles.css';

const MatchTable = (props) => {
    const { data } = props;

    // Sort data by date ascending (oldest first, newest last)
    const sortedData = useMemo(() => {
        if (!data || data.length === 0) return [];

        return [...data].sort((a, b) => {
            const dateA = new Date(a.match_date);
            const dateB = new Date(b.match_date);
            return dateA - dateB; // Ascending order
        });
    }, [data]);

    const teamMatchColumns = [
        {
            path: 'opponent_school',
            label: 'Opponent',
            width: '35%',
        },
        {
            path: 'match_date_formatted',
            label: 'Date',
            width: '20%',
        },
        {
            path: 'team_score',
            label: 'Towson',
            width: '15%',
        },
        {
            path: 'opponent_score',
            label: 'Opponent',
            width: '15%',
        },
        {
            path: 'team_result',
            label: 'Result',
            width: '15%',
            content: (match) => {
                const result = match.team_result
                    ?.toString()
                    .toUpperCase()
                    .trim();
                const isWin = result === 'W' || result === 'WIN';
                const isLoss = result === 'L' || result === 'LOSS';

                return (
                    <span
                        className={
                            isWin
                                ? 'match-result-win'
                                : isLoss
                                ? 'match-result-loss'
                                : ''
                        }
                    >
                        {isWin
                            ? 'Win'
                            : isLoss
                            ? 'Loss'
                            : match.team_result || '-'}
                    </span>
                );
            },
        },
    ];

    return (
        <MaterialTable
            columns={teamMatchColumns}
            data={sortedData}
            minWidth={600}
        />
    );
};

export default MatchTable;
