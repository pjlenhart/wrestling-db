import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { eventsToCells, isDecided, SIDE_BOTH, SIDE_OURS, SIDE_THEIRS } from '../scoring/liveBout';
import '../styles/liveScoresheet.css';

/**
 * The whole dual at a glance -- the paper sheet, essentially.
 *
 * Two lines per bout, ours above theirs, with the tokens sitting in the period
 * column they were scored in. Read-only: this is for seeing where the dual
 * stands, and tapping a row moves the pad to that bout.
 */

const OT_COLUMNS = ['SV', 'TB1', 'TB2', 'UTB'];

const overtimeCell = (cells) =>
    OT_COLUMNS.map((column) => cells[column])
        .filter(Boolean)
        .join(' ');

const BoutGrid = ({ bouts, activeWeight, resultsByWeight, onSelectBout }) => (
    <Box className="ls-grid-wrap">
        <Table size="small" className="ls-grid" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell className="ls-grid-weight-col">Wt</TableCell>
                    <TableCell>Wrestler</TableCell>
                    <TableCell align="center">1st</TableCell>
                    <TableCell align="center">2nd</TableCell>
                    <TableCell align="center">3rd</TableCell>
                    <TableCell align="center">OT</TableCell>
                    <TableCell align="right">Result</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bouts.map((bout, index) => {
                    const cells = eventsToCells(bout.events);
                    const result = resultsByWeight[bout.weight];
                    const active = bout.weight === activeWeight;
                    const decided = isDecided(bout);

                    // Banded in pairs the way the paper book is, so the eye
                    // tracks one bout's two lines across the full width.
                    const rowClass = [
                        'ls-grid-row',
                        index % 2 === 1 ? 'ls-grid-stripe' : '',
                        active ? 'ls-grid-row-active' : '',
                        decided ? 'ls-grid-row-decided' : '',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    // A double forfeit has no winner and no points, so it gets
                    // a plain zero rather than a signed one.
                    let teamPoints = '';
                    if (result && result.result === 'Win') teamPoints = `+${result.teamPointsFor}`;
                    else if (result && result.result === 'Loss') teamPoints = `-${result.teamPointsAgainst}`;
                    else if (result) teamPoints = '0';

                    return (
                        <React.Fragment key={bout.weight}>
                            <TableRow className={rowClass} onClick={() => onSelectBout(bout.weight)} hover>
                                <TableCell rowSpan={2} className="ls-grid-weight">
                                    {bout.weight}
                                </TableCell>
                                <TableCell className="ls-grid-name">
                                    {bout.forfeit === SIDE_OURS || bout.forfeit === SIDE_BOTH ? (
                                        <em className="ls-grid-forfeit">forfeit</em>
                                    ) : (
                                        bout.wrestler || <span className="ls-grid-blank">—</span>
                                    )}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {cells.ours['1'] || ''}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {cells.ours['2'] || ''}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {cells.ours['3'] || ''}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {overtimeCell(cells.ours)}
                                </TableCell>
                                <TableCell rowSpan={2} align="right" className="ls-grid-result">
                                    {result ? (
                                        <>
                                            <span
                                                className={
                                                    result.result === 'Win'
                                                        ? 'ls-result-win'
                                                        : result.result === 'Loss'
                                                        ? 'ls-result-loss'
                                                        : 'ls-result-none'
                                                }
                                            >
                                                {teamPoints}
                                            </span>
                                            <Typography variant="caption" display="block" color="text.secondary">
                                                {result.method}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography variant="caption" color="text.secondary">
                                            {bout.status}
                                        </Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow className={`${rowClass} ls-grid-row-second`} onClick={() => onSelectBout(bout.weight)} hover>
                                <TableCell className="ls-grid-name ls-grid-name-theirs">
                                    {bout.forfeit === SIDE_THEIRS || bout.forfeit === SIDE_BOTH ? (
                                        <em className="ls-grid-forfeit">forfeit</em>
                                    ) : (
                                        bout.opponent || <span className="ls-grid-blank">—</span>
                                    )}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {cells.theirs['1'] || ''}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {cells.theirs['2'] || ''}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {cells.theirs['3'] || ''}
                                </TableCell>
                                <TableCell align="center" className="ls-grid-cell">
                                    {overtimeCell(cells.theirs)}
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    );
                })}
            </TableBody>
        </Table>
    </Box>
);

export default BoutGrid;
