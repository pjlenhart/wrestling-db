import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BoutPanel from './BoutPanel';
import QuickResult from './QuickResult';
import { TOURNAMENT_STEPS } from './ScoringHelp';
import { SIDE_OURS, SIDE_THEIRS, WEIGHT_CLASSES, isDecided, rulesForDate } from '../scoring/liveBout';
import { MODE_LIVE, MODE_QUICK, deriveTournamentBout, describeResult } from '../scoring/tournamentBout';
import { canEditScoresheets } from '../permissions';
import '../styles/liveScoresheet.css';

/** A tournament bout has no double forfeit: there is always somebody on one side. */
const TOURNAMENT_FORFEITS = [
    { value: SIDE_OURS, label: 'We forfeit' },
    { value: SIDE_THEIRS, label: 'They forfeit' },
];

const tournamentForfeitNote = (forfeit) =>
    forfeit === SIDE_OURS
        ? 'We forfeited this bout. The sheet is kept, but nothing is recorded for our wrestler — the same as a dual.'
        : 'The opponent forfeited. This goes on our wrestler’s record as a win by forfeit.';

/** The sheet in the shape the engine reads. */
export const sheetOf = (draft) => ({
    tournament: draft.tournament,
    matchDate: draft.matchDate,
    opponentSchool: draft.opponentSchool,
    opponentSchoolId: draft.opponentSchoolId,
    bout: draft.bout,
});

/**
 * Why the bout cannot be recorded yet, beyond what the engine says.
 *
 * A live bout has to be marked final, the same as in a dual: tapping a pin is
 * easy to do by accident, and the result is only what it is once somebody
 * says the bout is over.
 */
const blockersOf = (draft, derived) => {
    const blockers = [...derived.errors];
    if (draft.bout.mode !== MODE_QUICK && !isDecided(draft.bout)) {
        blockers.push('mark the bout final first');
    }
    return blockers;
};

const RecordDialog = ({ open, draft, derived, onClose, onConfirm }) => {
    const blockers = blockersOf(draft, derived);
    const summary = describeResult(derived);
    const { bout } = draft;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="ls-dialog app-fields">
            <DialogTitle>Record this bout</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body2" color="text.secondary">
                    {draft.tournament} &middot; {draft.matchDate} &middot; {bout.weight} lbs
                </Typography>
                <Typography sx={{ mt: 0.5, mb: 2 }}>
                    <strong>{bout.wrestler || 'Our wrestler'}</strong> vs {bout.opponent || 'Opponent'}
                    {draft.opponentSchool ? ` (${draft.opponentSchool})` : ''}
                </Typography>

                {summary && !blockers.length && (
                    <Box className="ls-submit-score">
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Will be recorded as
                            </Typography>
                            <Typography className="ls-submit-score-value ls-submit-result">{summary}</Typography>
                            {derived.record && (
                                <Typography variant="caption" color="text.secondary">
                                    {derived.breakdown ? 'With the full scoring breakdown.' : 'Result only, no breakdown.'}
                                    {derived.matchTime !== '00:00:00' ? ` Time ${bout.fallTime}.` : ''}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}

                {blockers.length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        <AlertTitle>Not ready to record</AlertTitle>
                        {blockers.map((message, index) => (
                            <div key={index}>{message[0].toUpperCase() + message.slice(1)}.</div>
                        ))}
                    </Alert>
                )}

                {derived.warnings.length > 0 && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>Worth a look</AlertTitle>
                        {derived.warnings.map((message, index) => (
                            <div key={index}>{message}</div>
                        ))}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Keep scoring
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    className="ls-primary-button"
                    disabled={blockers.length > 0}
                >
                    Record bout
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const TournamentWorkspace = ({
    draft,
    roster,
    schools,
    notFound,
    error,
    readOnly,
    fromServer,
    submitting,
    onSubmit,
    onSetWeight,
    onSetSchool,
    onSetMode,
    onSetQuick,
    onSetFallTime,
    ...boutHandlers
}) => {
    const [recordOpen, setRecordOpen] = useState(false);

    const derived = useMemo(() => (draft ? deriveTournamentBout(sheetOf(draft)) : null), [draft]);
    const rules = useMemo(() => (draft ? rulesForDate(draft.matchDate) : null), [draft]);

    if (notFound) {
        return (
            <Container maxWidth="sm" className="ls-page app-fields">
                <Alert severity="warning">
                    That scoresheet is not on this device.{' '}
                    <RouterLink to="/scoresheet">Back to the list</RouterLink>
                </Alert>
            </Container>
        );
    }

    if (!draft) {
        return (
            <Container maxWidth="sm" className="ls-page app-fields">
                {error ? <Alert severity="error">{error}</Alert> : <Typography>Loading…</Typography>}
            </Container>
        );
    }

    const { bout } = draft;
    const quick = bout.mode === MODE_QUICK;
    const selectedSchool = schools.find((school) => school.school_id === draft.opponentSchoolId) || null;

    return (
        <Container maxWidth="md" className="ls-page ls-workspace">
            <Paper className="ls-scorebar" elevation={0}>
                <IconButton component={RouterLink} to="/scoresheet" size="small" className="ls-scorebar-back">
                    <ChevronLeftIcon />
                </IconButton>

                <Box className="ls-scorebar-meta">
                    <Typography className="ls-scorebar-opponent" noWrap title={draft.tournament}>
                        {draft.tournament}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {draft.matchDate} &middot; {bout.weight} lbs
                    </Typography>
                </Box>

                {/* No score here: a dual's bar holds the team score, and a
                    single bout has none. Each wrestler's points sit on the pad. */}

                {!readOnly && (
                    <Button
                        variant="contained"
                        className="ls-primary-button"
                        disabled={submitting}
                        onClick={() => setRecordOpen(true)}
                    >
                        {submitting ? 'Recording…' : 'Record'}
                    </Button>
                )}
            </Paper>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {fromServer && (
                <Alert severity={draft.status === 'Committed' ? 'success' : 'info'} sx={{ mb: 2 }}>
                    {draft.status !== 'Committed'
                        ? 'This bout was submitted but is not in the match tables yet.'
                        : bout.matchId
                        ? `This bout is on ${bout.wrestler}'s record. Match #${bout.matchId}.`
                        : 'We forfeited this bout, so nothing was recorded.'}
                    {derived.result || !derived.record ? ` ${describeResult(derived)}.` : ''}
                </Alert>
            )}

            {!fromServer && !canEditScoresheets() && (
                <Alert
                    severity="info"
                    sx={{ mb: 2 }}
                    action={
                        <Button
                            component={RouterLink}
                            to={`/scoresheet/login?next=/scoresheet/tournament/${draft.id}`}
                            color="inherit"
                            size="small"
                        >
                            Sign in
                        </Button>
                    }
                >
                    You are viewing this scoresheet. Sign in to score a bout.
                </Alert>
            )}

            <Paper className="ls-bout-panel ls-tournament-details app-fields" elevation={0}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        select
                        label="Weight"
                        value={bout.weight ?? ''}
                        onChange={(e) => onSetWeight(Number(e.target.value))}
                        disabled={readOnly}
                        size="small"
                        sx={{ minWidth: 120 }}
                    >
                        {WEIGHT_CLASSES.map((weight) => (
                            <MenuItem key={weight} value={weight}>
                                {weight}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Autocomplete
                        freeSolo
                        options={schools}
                        value={selectedSchool || draft.opponentSchool || null}
                        onChange={(_e, value) => {
                            if (value && typeof value === 'object') {
                                onSetSchool({ name: value.school_name, id: value.school_id });
                            } else {
                                onSetSchool({ name: value || '', id: null });
                            }
                        }}
                        onInputChange={(_e, value, reason) => {
                            // Typing unbinds the picked school; picking is handled above.
                            if (reason === 'input') onSetSchool({ name: value, id: null });
                        }}
                        inputValue={draft.opponentSchool || ''}
                        getOptionLabel={(option) => (typeof option === 'string' ? option : option.school_name || '')}
                        isOptionEqualToValue={(option, value) =>
                            typeof value === 'object' && option.school_id === value.school_id
                        }
                        disabled={readOnly}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Opponent's school"
                                helperText={readOnly ? ' ' : 'Not in the directory? Type it in.'}
                            />
                        )}
                    />

                    <TextField
                        label="Time (m:ss)"
                        placeholder="3:42"
                        value={bout.fallTime || ''}
                        onChange={(e) => onSetFallTime(e.target.value)}
                        disabled={readOnly}
                        size="small"
                        sx={{ minWidth: 120 }}
                        inputProps={{ inputMode: 'numeric' }}
                        helperText="Pins, techs, defaults"
                    />
                </Stack>

                {!readOnly && !bout.forfeit && (
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" className="ls-field-label">
                            How are you entering it?
                        </Typography>
                        <ToggleButtonGroup
                            value={quick ? MODE_QUICK : MODE_LIVE}
                            exclusive
                            fullWidth
                            size="small"
                            onChange={(_e, value) => value && onSetMode(value)}
                        >
                            <ToggleButton value={MODE_LIVE}>Live, tap by tap</ToggleButton>
                            <ToggleButton value={MODE_QUICK}>Quick result</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                )}
            </Paper>

            <BoutPanel
                bout={bout}
                roster={roster}
                rules={rules}
                result={derived.result ? derived : null}
                readOnly={readOnly}
                forfeitOptions={TOURNAMENT_FORFEITS}
                describeForfeit={tournamentForfeitNote}
                showTeamPoints={false}
                showFinal={!quick}
                finalPrompt="That ends the bout. Mark it final, then record it."
                helpSteps={TOURNAMENT_STEPS}
                helpStartsOpen={false}
                {...boutHandlers}
            >
                {quick ? <QuickResult bout={bout} onChange={onSetQuick} readOnly={readOnly} /> : null}
            </BoutPanel>

            <RecordDialog
                open={recordOpen}
                draft={draft}
                derived={derived}
                onClose={() => setRecordOpen(false)}
                onConfirm={() => {
                    setRecordOpen(false);
                    onSubmit();
                }}
            />
        </Container>
    );
};

export default TournamentWorkspace;
