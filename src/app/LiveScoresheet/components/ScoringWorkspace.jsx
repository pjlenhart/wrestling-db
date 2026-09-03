import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BoutGrid from './BoutGrid';
import BoutPanel from './BoutPanel';
import SubmitDialog from './SubmitDialog';
import { deriveLiveDual, rulesForDate } from '../scoring/liveBout';
import { canEditScoresheets } from '../permissions';
import '../styles/liveScoresheet.css';

const ScoringWorkspace = ({
    draft,
    roster,
    activeWeight,
    notFound,
    error,
    readOnly,
    fromServer,
    submitting,
    onSelectBout,
    onSubmit,
    ...boutHandlers
}) => {
    const theme = useTheme();
    const wide = useMediaQuery(theme.breakpoints.up('lg'));
    const [tab, setTab] = useState(0);
    const [submitOpen, setSubmitOpen] = useState(false);

    const dual = useMemo(() => (draft ? deriveLiveDual(draft) : null), [draft]);
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

    const index = draft.bouts.findIndex((b) => b.weight === activeWeight);
    const activeBout = index >= 0 ? draft.bouts[index] : draft.bouts[0];
    const step = (delta) => {
        const next = draft.bouts[index + delta];
        if (next) onSelectBout(next.weight);
    };

    const panel = (
        <BoutPanel
            bout={activeBout}
            roster={roster}
            rules={rules}
            result={dual.byWeight[activeBout.weight]}
            readOnly={readOnly}
            {...boutHandlers}
        />
    );

    const grid = (
        <BoutGrid
            bouts={draft.bouts}
            activeWeight={activeBout.weight}
            resultsByWeight={dual.byWeight}
            onSelectBout={onSelectBout}
        />
    );

    return (
        <Container maxWidth="xl" className="ls-page ls-workspace">
            <Paper className="ls-scorebar" elevation={0}>
                <IconButton component={RouterLink} to="/scoresheet" size="small" className="ls-scorebar-back">
                    <ChevronLeftIcon />
                </IconButton>

                <Box className="ls-scorebar-meta">
                    <Typography className="ls-scorebar-opponent" noWrap>
                        {draft.venue === 'Away' ? 'at ' : 'vs '}
                        {draft.opponentSchool}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {draft.matchDate} &middot; {dual.decidedCount} of {draft.bouts.length} scored
                    </Typography>
                </Box>

                <Box className="ls-scorebar-score">
                    <span className={dual.ourScore >= dual.opponentScore ? 'ls-score-lead' : ''}>
                        {dual.ourScore}
                    </span>
                    <span className="ls-score-dash">&ndash;</span>
                    <span className={dual.opponentScore > dual.ourScore ? 'ls-score-lead' : ''}>
                        {dual.opponentScore}
                    </span>
                </Box>

                {!readOnly && (
                    <Button
                        variant="contained"
                        className="ls-primary-button"
                        disabled={submitting}
                        onClick={() => setSubmitOpen(true)}
                    >
                        {submitting ? 'Submitting…' : 'Finish'}
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
                    {draft.status === 'Committed'
                        ? 'This dual is recorded. Every bout on it is in the match tables.'
                        : 'This dual was submitted but is not in the match tables yet.'}
                    {draft.teamMatchId ? ` Team match #${draft.teamMatchId}.` : ''}
                </Alert>
            )}

            {!fromServer && !canEditScoresheets() && (
                <Alert
                    severity="info"
                    sx={{ mb: 2 }}
                    action={
                        <Button
                            component={RouterLink}
                            to={`/scoresheet/login?next=/scoresheet/${draft.id}`}
                            color="inherit"
                            size="small"
                        >
                            Sign in
                        </Button>
                    }
                >
                    You are viewing this scoresheet. Sign in to score a dual.
                </Alert>
            )}

            <Box className="ls-bout-nav">
                <IconButton size="small" onClick={() => step(-1)} disabled={index <= 0}>
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <Typography className="ls-bout-nav-label">
                    {activeBout.weight} lbs
                    <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        bout {index + 1} of {draft.bouts.length}
                    </Typography>
                </Typography>
                <IconButton size="small" onClick={() => step(1)} disabled={index >= draft.bouts.length - 1}>
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Box>

            {readOnly ? (
                /* Reading, not scoring: the sheet is the whole point, so it
                   gets the full width and the bout detail sits underneath
                   rather than competing with it for half the screen. */
                <Box className="ls-readonly">
                    {grid}
                    {panel}
                </Box>
            ) : wide ? (
                <Box className="ls-split">
                    <Box className="ls-split-panel">{panel}</Box>
                    <Box className="ls-split-grid">{grid}</Box>
                </Box>
            ) : (
                <>
                    <Tabs value={tab} onChange={(_e, value) => setTab(value)} className="ls-tabs" variant="fullWidth">
                        <Tab label="Score" />
                        <Tab label="Full sheet" />
                    </Tabs>
                    <Box sx={{ mt: 2 }}>{tab === 0 ? panel : grid}</Box>
                </>
            )}

            <SubmitDialog
                open={submitOpen}
                draft={draft}
                dual={dual}
                onClose={() => setSubmitOpen(false)}
                onConfirm={(scores) => {
                    onSubmit(scores);
                    setSubmitOpen(false);
                }}
            />
        </Container>
    );
};

export default ScoringWorkspace;
