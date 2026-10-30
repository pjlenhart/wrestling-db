import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import MaterialTable from '../../common/Table/MaterialTable';
import { DualPlaylistLink } from '../../common/video/VideoLink';
import '../styles/matchStyles.css';

// 'win', 'loss', or null when the result isn't recorded as either.
const resultOf = (match) => {
    const result = match.team_result?.toString().toUpperCase().trim();
    if (result === 'W' || result === 'WIN') return 'win';
    if (result === 'L' || result === 'LOSS') return 'loss';
    return null;
};

// Only duals recorded from a scoresheet have one. The rest were entered by
// hand and have nothing to link to, so they get a dash rather than a link
// that goes nowhere.
const ScoresheetLink = ({ match }) =>
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
    );

// On a phone, seven columns can't fit without scrolling sideways, so each dual
// becomes one compact row: who and when on the left, the score and result on
// the right.
const MatchList = ({ matches }) => (
    <ul className="match-list">
        {matches.map((match, index) => {
            const result = resultOf(match);
            return (
                <li key={match.team_match_id ?? index} className="match-list-item">
                    <div className="match-list-info">
                        <span className="match-list-opponent">{match.opponent_school}</span>
                        <span className="match-list-date">{match.match_date_formatted}</span>
                    </div>
                    <div className="match-list-score">
                        <span className={`match-list-result ${result ? `is-${result}` : ''}`}>
                            {result === 'win' ? 'W' : result === 'loss' ? 'L' : '-'}
                        </span>
                        <span className="match-list-points">
                            {match.team_score ?? '-'}&ndash;{match.opponent_score ?? '-'}
                        </span>
                    </div>
                    <DualPlaylistLink teamMatchId={match.team_match_id} opponent={match.opponent_school} />
                    <ScoresheetLink match={match} />
                </li>
            );
        })}
    </ul>
);

const MatchTable = (props) => {
    const { data } = props;
    const isPhone = useMediaQuery('(max-width: 599px)');

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
            width: '28%',
        },
        {
            path: 'match_date_formatted',
            label: 'Date',
            width: '16%',
        },
        {
            path: 'team_score',
            label: 'Towson',
            width: '11%',
        },
        {
            path: 'opponent_score',
            label: 'Opponent',
            width: '11%',
        },
        {
            path: 'team_result',
            label: 'Result',
            width: '12%',
            content: (match) => {
                const result = resultOf(match);
                return (
                    <span className={result ? `match-result-${result}` : ''}>
                        {result === 'win'
                            ? 'Win'
                            : result === 'loss'
                            ? 'Loss'
                            : match.team_result || '-'}
                    </span>
                );
            },
        },
        {
            // The YouTube playlist of every bout filmed at the dual.
            path: 'video',
            label: 'Video',
            width: '10%',
            content: (match) => (
                <DualPlaylistLink teamMatchId={match.team_match_id} opponent={match.opponent_school} />
            ),
        },
        {
            path: 'scoresheet_id',
            label: 'Scoresheet',
            width: '12%',
            content: (match) => <ScoresheetLink match={match} />,
        },
    ];

    if (isPhone) return <MatchList matches={sortedData} />;

    return (
        <MaterialTable
            columns={teamMatchColumns}
            data={sortedData}
            minWidth={600}
        />
    );
};

export default MatchTable;
