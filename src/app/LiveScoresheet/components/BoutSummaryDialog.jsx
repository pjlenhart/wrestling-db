import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { formatCalendarDate } from '../../common/dates';
import { breakdownRows, hasBreakdown } from '../../common/scoringBreakdown';
import { fallTime, formatScore } from '../../common/boutColumns';
import { videoIdsFor, watchUrl } from '../../common/video/matchVideos';
import '../styles/liveScoresheet.css';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** "Win · Pin · 2nd period · 3:42 · 9–1": how the bout ended, as recorded. */
const resultLine = (match) => {
    const ms = match.match_stats || {};
    const period = ms.period && ms.method_of_result !== 'Forfeit' ? `${ms.period} period` : '';
    return [match.match_result, ms.method_of_result, period, fallTime(match), formatScore(match)]
        .filter(Boolean)
        .join(' · ');
};

/** Every scoring action, each way, with what it was worth. */
const BreakdownTable = ({ match }) => {
    const rows = breakdownRows(match);
    const ms = match.match_stats;
    const total = (side) => ms[`total_points_${side}`] ?? ms[`points_${side}`];

    return (
        <Table size="small" className="ls-summary-table" aria-label="Scoring breakdown">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell align="center" colSpan={2}>
                        {match.wrestler_name}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                        {match.opponent_name || 'Opponent'}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Scoring</TableCell>
                    <TableCell align="center">For</TableCell>
                    <TableCell align="center">Pts</TableCell>
                    <TableCell align="center">Against</TableCell>
                    <TableCell align="center">Pts</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.label}>
                        <TableCell component="th" scope="row">
                            {row.label}
                        </TableCell>
                        <TableCell align="center">{row.for}</TableCell>
                        <TableCell align="center">{row.forPoints}</TableCell>
                        <TableCell align="center">{row.against}</TableCell>
                        <TableCell align="center">{row.againstPoints}</TableCell>
                    </TableRow>
                ))}
                <TableRow className="ls-summary-total">
                    <TableCell component="th" scope="row">
                        Total
                    </TableCell>
                    <TableCell />
                    <TableCell align="center">{total('for')}</TableCell>
                    <TableCell />
                    <TableCell align="center">{total('against')}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

/**
 * What the record says about a bout that has no scoresheet: who, where, how
 * it ended, and the scoring breakdown when one was entered. Most bouts were
 * entered by hand before the live scoresheet existed, so this is what their
 * Scoresheet link opens.
 */
const BoutSummaryDialog = ({ match, onClose }) => {
    const fullScreen = useMediaQuery('(max-width: 599px)');
    const ms = match?.match_stats || {};
    const videos = match ? videoIdsFor(match.match_id) : [];
    const forfeit = ms.method_of_result === 'Forfeit' || ms.method_of_result === 'Bye';
    const teamPoints = Number(ms.team_points_earned);

    return (
        <Dialog
            open={Boolean(match)}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            fullScreen={fullScreen}
            className="ls-dialog"
        >
            <DialogTitle>Match summary</DialogTitle>
            {match && (
                <DialogContent dividers>
                    <Box className="ls-dialog-head">
                        <Typography className="ls-dialog-title">
                            {match.wrestler_name} vs {match.opponent_name || 'opponent'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" component="p">
                            {[
                                ms.tournament || (match.school_name && `Dual vs ${match.school_name}`),
                                ms.tournament && match.school_name,
                                formatCalendarDate(match.match_date),
                                match.weight_class && `${match.weight_class} lbs`,
                            ]
                                .filter(Boolean)
                                .join(' · ')}
                        </Typography>
                        <Typography className="ls-dialog-result">{resultLine(match)}</Typography>
                        {teamPoints > 0 && (
                            <Typography variant="body2" color="text.secondary">
                                {plural(teamPoints, 'team point')} for Towson
                            </Typography>
                        )}
                    </Box>

                    {forfeit ? (
                        <Typography variant="body2" color="text.secondary">
                            No match was wrestled, so there&rsquo;s no scoring to show.
                        </Typography>
                    ) : hasBreakdown(match) ? (
                        <BreakdownTable match={match} />
                    ) : (
                        <Alert severity="info">
                            Only the result and score were recorded for this bout, so there&rsquo;s no
                            scoring breakdown.
                        </Alert>
                    )}
                </DialogContent>
            )}
            <DialogActions>
                {videos.map((id, index) => (
                    <Button
                        key={id}
                        href={watchUrl(id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<YouTubeIcon />}
                        color="inherit"
                    >
                        {videos.length > 1 ? `Part ${index + 1}` : 'Watch on YouTube'}
                    </Button>
                ))}
                <Button onClick={onClose} variant="contained" className="ls-primary-button">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BoutSummaryDialog;
