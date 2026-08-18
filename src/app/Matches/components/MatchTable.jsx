import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
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
            width: '30%',
        },
        {
            path: 'match_date_formatted',
            label: 'Date',
            width: '18%',
        },
        {
            path: 'team_score',
            label: 'Towson',
            width: '12%',
        },
        {
            path: 'opponent_score',
            label: 'Opponent',
            width: '12%',
        },
        {
            path: 'team_result',
            label: 'Result',
            width: '14%',
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
        {
            path: 'scoresheet_id',
            label: 'Scoresheet',
            width: '14%',
            // Only duals recorded from a scoresheet have one. The rest were
            // entered by hand and have nothing to link to, so the cell stays
            // empty rather than offering a link that goes nowhere.
            content: (match) =>
                match.scoresheet_id ? (
                    <Tooltip title="View the scoresheet for this dual">
                        <IconButton
                            component={Link}
                            to={`/scoresheet/${match.scoresheet_id}`}
                            size="small"
                            aria-label={`View the scoresheet for the dual against ${match.opponent_school}`}
                            className="match-scoresheet-link"
                        >
                            <DescriptionOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <span className="match-scoresheet-none">&mdash;</span>
                ),
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
