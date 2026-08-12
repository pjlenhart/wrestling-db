import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import UndoIcon from '@mui/icons-material/Undo';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ScoringPad from './ScoringPad';
import ScoringHelp from './ScoringHelp';
import {
    BOUT_FINAL,
    BOUT_IN_PROGRESS,
    PERIOD_ORDER,
    SIDE_BOTH,
    SIDE_OURS,
    SIDE_THEIRS,
    boutReadiness,
    boutScore,
    describeToken,
    isDecided,
    isTerminalToken,
} from '../scoring/liveBout';
import '../styles/liveScoresheet.css';

const PERIOD_LABELS = { 1: '1st', 2: '2nd', 3: '3rd', SV: 'SV', TB1: 'TB1', TB2: 'TB2', UTB: 'UTB' };

const FORFEIT_OPTIONS = [
    { value: SIDE_OURS, label: 'We forfeit' },
    { value: SIDE_THEIRS, label: 'They forfeit' },
    { value: SIDE_BOTH, label: 'Double forfeit' },
];

const forfeitNote = (forfeit) => {
    if (forfeit === SIDE_OURS) {
        return 'We forfeited this weight — six team points to the opponent, and nothing is recorded for our roster.';
    }
    if (forfeit === SIDE_THEIRS) {
        return 'The opponent forfeited — six team points to us.';
    }
    return 'Neither team wrestled this weight. A double forfeit is worth nothing to either side.';
};

const BoutPanel = ({
    bout,
    roster,
    rules,
    result,
    onScore,
    onUndo,
    onRemoveEvent,
    onSetWrestler,
    onSetOpponent,
    onSetForfeit,
    onSetStatus,
    onSetWinner,
    readOnly,
}) => {
    const [period, setPeriod] = useState('1');
    const [logOpen, setLogOpen] = useState(false);

    // Back to the first period whenever the bout changes. Carrying the previous
    // bout's period across is silent and easy to miss -- the marks land in the
    // right bout but the wrong column, which only shows up as a strange period
    // on the finished result.
    useEffect(() => {
        setPeriod('1');
    }, [bout.weight]);

    const score = boutScore(bout);
    const decided = isDecided(bout);
    const conceded = Boolean(bout.forfeit);
    const selectedWrestler = roster.find((w) => w.wrestler_id === bout.wrestlerId) || null;

    const ourName = bout.wrestler || 'Our wrestler';
    const theirName = bout.opponent || 'Opponent';

    // A bout with a pin, DQ or default on it is over. Saying so is the single
    // most useful nudge for someone who has not scored before -- the score is
    // only counted once the bout is marked final.
    const endingMark = bout.events.find((event) => isTerminalToken(event.token));
    const readiness = boutReadiness(bout);

    // Nothing can be scored onto a bout nobody has identified yet. A tap that
    // lands on a blank row is invisible until the dual fails to add up, and by
    // then there is no way to know which bout it belonged to.
    const identified = Boolean(String(bout.wrestler || '').trim() || String(bout.opponent || '').trim());
    const padDisabled = readOnly || !identified;
    const promptFinal =
        Boolean(endingMark) && bout.status !== BOUT_FINAL && !conceded && !readOnly && readiness.ready;

    // A disqualification or default cannot be settled by the score, so the
    // engine refuses it outright until a winner is named.
    const needsWinner = Boolean(
        !result &&
            decided &&
            bout.events.some((e) => e.token === 'DQ' || e.token === 'Def') &&
            !bout.winner,
    );

    return (
        <Paper className="ls-bout-panel" elevation={0}>
            <Box className="ls-bout-head">
                <Typography className="ls-bout-weight">{bout.weight}</Typography>
                <Chip
                    size="small"
                    label={conceded ? FORFEIT_OPTIONS.find((o) => o.value === bout.forfeit).label : bout.status}
                    color={decided ? 'success' : 'default'}
                    variant={decided ? 'filled' : 'outlined'}
                />
                <Box sx={{ flexGrow: 1 }} />
                {result && result.result && (
                    <Typography className="ls-bout-result" component="span">
                        {result.result === 'Win' ? 'W' : 'L'} &middot; {result.method} &middot;{' '}
                        {result.result === 'Win' ? result.teamPointsFor : result.teamPointsAgainst} team pts
                    </Typography>
                )}
            </Box>

            {!readOnly && <ScoringHelp rules={rules} />}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="ls-bout-names">
                {/* A strict picklist, not free text: picking from the roster is
                    what binds wrestler_id, and that id is what ties the bout to
                    a wrestler rather than to a string that has to be matched
                    back later. Typing only filters. */}
                {roster.length ? (
                    <Autocomplete
                        options={roster}
                        value={selectedWrestler}
                        onChange={(_e, value) => onSetWrestler(bout.weight, value)}
                        getOptionLabel={(option) => option.wrestler_name || ''}
                        isOptionEqualToValue={(option, value) => option.wrestler_id === value.wrestler_id}
                        disabled={readOnly}
                        fullWidth
                        size="small"
                        renderInput={(params) => <TextField {...params} label="Our wrestler" />}
                    />
                ) : (
                    <TextField
                        label="Our wrestler"
                        value={bout.wrestler}
                        onChange={(e) => onSetWrestler(bout.weight, e.target.value)}
                        disabled={readOnly}
                        fullWidth
                        size="small"
                        helperText="Roster unavailable — type the name"
                    />
                )}
                <TextField
                    label="Opponent"
                    value={bout.opponent}
                    onChange={(e) => onSetOpponent(bout.weight, e.target.value)}
                    disabled={readOnly}
                    fullWidth
                    size="small"
                />
            </Stack>

            {conceded ? (
                <Alert severity="info" className="ls-bout-note">
                    {forfeitNote(bout.forfeit)}
                </Alert>
            ) : readOnly ? (
                /* Reading a finished dual, not scoring one. The pad, the period
                   selector and the forfeit controls are all things you would
                   press, so none of them belong here -- what a reader wants is
                   what happened, in words. */
                <Box className="ls-readonly-log">
                    <Typography variant="caption" className="ls-field-label">
                        What happened
                    </Typography>
                    {bout.events.length ? (
                        <Box className="ls-log-list">
                            {bout.events.map((event) => (
                                <Box
                                    key={event.id}
                                    className={`ls-log-row ${
                                        event.side === SIDE_OURS ? 'ls-log-ours' : 'ls-log-theirs'
                                    }`}
                                >
                                    <span className="ls-log-period">{PERIOD_LABELS[event.period]}</span>
                                    <span className="ls-log-who">
                                        {event.side === SIDE_OURS ? ourName : theirName}
                                    </span>
                                    <span className="ls-log-what">{describeToken(event.token, rules)}</span>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Nothing was scored in this bout.
                        </Typography>
                    )}
                </Box>
            ) : (
                <>
                    <Box className="ls-period-row">
                        <Typography variant="caption" className="ls-field-label">
                            Scoring in
                        </Typography>
                        <ToggleButtonGroup
                            value={period}
                            exclusive
                            onChange={(_e, value) => value && setPeriod(value)}
                            size="small"
                            className="ls-period-group"
                        >
                            {PERIOD_ORDER.map((column) => (
                                <ToggleButton key={column} value={column} disabled={readOnly}>
                                    {PERIOD_LABELS[column]}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>

                    <ScoringPad
                        bout={bout}
                        rules={rules}
                        period={period}
                        score={score}
                        onScore={(entry) => onScore(bout.weight, entry)}
                        disabled={padDisabled}
                        hint={
                            identified
                                ? 'Tap what happened, under the wrestler who earned it.'
                                : 'Pick our wrestler or type the opponent before scoring.'
                        }
                    />

                    {promptFinal && (
                        <Alert
                            severity="success"
                            className="ls-bout-note"
                            action={
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={() => onSetStatus(bout.weight, BOUT_FINAL)}
                                >
                                    Mark final
                                </Button>
                            }
                        >
                            That ends the bout. Mark it final so it counts toward the team score.
                        </Alert>
                    )}

                    {/* Undo stays on the surface because it is used mid-scramble;
                        the full log is a dialog so the pad fits on one screen. */}
                    <Box className="ls-log-bar">
                        <Button
                            size="small"
                            startIcon={<UndoIcon />}
                            onClick={() => onUndo(bout.weight)}
                            disabled={readOnly || !bout.events.length}
                        >
                            Undo
                        </Button>
                        <Button
                            size="small"
                            startIcon={<HistoryIcon />}
                            onClick={() => setLogOpen(true)}
                            disabled={!bout.events.length}
                        >
                            What has happened ({bout.events.length})
                        </Button>
                    </Box>

                    <Dialog open={logOpen} onClose={() => setLogOpen(false)} maxWidth="xs" fullWidth>
                        <DialogTitle className="ls-log-title">
                            {bout.weight} lbs &mdash; what has happened
                        </DialogTitle>
                        <DialogContent dividers>
                            {bout.events.length ? (
                                <Box className="ls-log-list">
                                    {bout.events.map((event) => (
                                        <Box
                                            key={event.id}
                                            className={`ls-log-row ${
                                                event.side === SIDE_OURS ? 'ls-log-ours' : 'ls-log-theirs'
                                            }`}
                                        >
                                            <span className="ls-log-period">{PERIOD_LABELS[event.period]}</span>
                                            <span className="ls-log-who">
                                                {event.side === SIDE_OURS ? ourName : theirName}
                                            </span>
                                            <span className="ls-log-what">
                                                {describeToken(event.token, rules)}
                                            </span>
                                            {!readOnly && (
                                                <IconButton
                                                    size="small"
                                                    className="ls-log-remove"
                                                    onClick={() => onRemoveEvent(bout.weight, event.id)}
                                                    aria-label="Remove this"
                                                >
                                                    <CloseIcon sx={{ fontSize: 14 }} />
                                                </IconButton>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Nothing scored yet.
                                </Typography>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setLogOpen(false)}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}

            {needsWinner && (
                <Alert severity="warning" className="ls-bout-note">
                    A disqualification or default cannot be settled by the score. Who won?
                    <Box sx={{ mt: 1 }}>
                        <Button size="small" onClick={() => onSetWinner(bout.weight, SIDE_OURS)}>
                            {ourName}
                        </Button>
                        <Button size="small" onClick={() => onSetWinner(bout.weight, SIDE_THEIRS)}>
                            {theirName}
                        </Button>
                    </Box>
                </Alert>
            )}

            {!readOnly && (
            <Box className="ls-bout-actions">
                <Box className="ls-forfeit">
                    <Typography variant="caption" className="ls-field-label">
                        Nobody wrestled?
                    </Typography>
                    <ToggleButtonGroup
                        value={bout.forfeit}
                        exclusive
                        size="small"
                        onChange={(_e, value) => onSetForfeit(bout.weight, value)}
                        className="ls-forfeit-group"
                    >
                        {FORFEIT_OPTIONS.map((option) => (
                            <ToggleButton key={option.value} value={option.value} disabled={readOnly}>
                                {option.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {!conceded && (
                    <Box className="ls-final">
                        {!readiness.ready && bout.status !== BOUT_FINAL && (
                            <Typography variant="caption" className="ls-final-reason">
                                First {readiness.reason}.
                            </Typography>
                        )}
                        <Button
                            variant={bout.status === BOUT_FINAL ? 'outlined' : 'contained'}
                            startIcon={<CheckCircleOutlineIcon />}
                            disabled={readOnly || (!readiness.ready && bout.status !== BOUT_FINAL)}
                            className={bout.status === BOUT_FINAL ? '' : 'ls-primary-button'}
                            onClick={() =>
                                onSetStatus(
                                    bout.weight,
                                    bout.status === BOUT_FINAL ? BOUT_IN_PROGRESS : BOUT_FINAL,
                                )
                            }
                        >
                            {bout.status === BOUT_FINAL ? 'Reopen bout' : 'Bout final'}
                        </Button>
                    </Box>
                )}
            </Box>
            )}

            {result && result.warnings.length > 0 && (
                <Alert severity="warning" className="ls-bout-note">
                    {result.warnings.map((warning, index) => (
                        <div key={index}>{warning}</div>
                    ))}
                </Alert>
            )}
        </Paper>
    );
};

export default BoutPanel;

export { PERIOD_LABELS };
