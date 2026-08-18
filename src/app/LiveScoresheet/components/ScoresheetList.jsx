import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PageHero from '../../common/Header/PageHero';
import { parseCalendarDate } from '../../common/dates';
import { seasonForDate } from '../scoring/scoring';
import { exportDraft } from '../storage/draftStore';
import { canEditScoresheets } from '../permissions';
import { getCurrentUser, logout } from '../services/scoresheetAuth';
import '../styles/liveScoresheet.css';
import '../../common/styles/globalStyles.css';

/**
 * Which season a dual belongs to.
 *
 * The date is rebuilt in UTC from its calendar parts before the season rule
 * reads it, so a November match cannot land in the previous season because the
 * browser happens to be a few hours off Greenwich.
 */
const seasonOf = (matchDate) => {
    const date = parseCalendarDate(matchDate);
    if (!date) return 'Undated';
    return seasonForDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())));
};

const longDate = (value) => {
    const date = parseCalendarDate(value);
    return date
        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';
};

/** Win, loss or neither -- a dual still being scored has not decided yet. */
const outcomeOf = (row) => {
    if (row.source === 'local') return 'progress';
    if (row.ourScore === null || row.ourScore === undefined) return 'progress';
    return row.ourScore >= row.opponentScore ? 'win' : 'loss';
};

const ScoresheetCard = ({ row, canEdit, onDelete }) => {
    const outcome = outcomeOf(row);
    const isLocal = row.source === 'local';
    const hasScore = row.ourScore !== null && row.ourScore !== undefined;

    return (
        <Box className={`ls-card ls-card-${outcome}`}>
            <Box className="ls-card-head">
                <span className="ls-card-badge">
                    {outcome === 'win' ? 'W' : outcome === 'loss' ? 'L' : '•'}
                </span>
                <Box className="ls-card-heading">
                    <Typography className="ls-card-opponent" title={row.opponentSchool}>
                        {row.venue === 'Away' ? 'at ' : 'vs '}
                        {row.opponentSchool || 'Unnamed opponent'}
                    </Typography>
                    <Typography className="ls-card-date">{longDate(row.matchDate)}</Typography>
                </Box>
            </Box>

            {hasScore ? (
                <Box className="ls-card-score">
                    <span className={row.ourScore >= row.opponentScore ? 'ls-score-lead' : ''}>
                        {row.ourScore}
                    </span>
                    <span className="ls-card-score-dash">&ndash;</span>
                    <span className={row.opponentScore > row.ourScore ? 'ls-score-lead' : ''}>
                        {row.opponentScore}
                    </span>
                </Box>
            ) : (
                <Box className="ls-card-score ls-card-score-empty">&mdash;</Box>
            )}

            {isLocal && row.boutCount ? (
                <Typography className="ls-card-progress-text">
                    {row.decidedCount} of {row.boutCount} bouts scored
                </Typography>
            ) : null}

            <Box className="ls-card-foot">
                <Chip
                    size="small"
                    label={isLocal ? 'On this device' : row.status}
                    icon={isLocal ? <PhoneIphoneIcon /> : undefined}
                    className={`ls-card-chip ls-card-chip-${outcome}`}
                    variant="outlined"
                />
                <Box sx={{ flexGrow: 1 }} />

                {isLocal && (
                    <>
                        <Tooltip title="Download a copy">
                            <IconButton size="small" onClick={() => exportDraft(row.draft)}>
                                <DownloadIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        {canEdit && (
                            <Tooltip title="Delete this draft">
                                <IconButton size="small" onClick={() => onDelete(row)}>
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </>
                )}

                <Button
                    component={RouterLink}
                    to={`/scoresheet/${row.id}`}
                    size="small"
                    className="ls-card-open"
                >
                    {isLocal && canEdit ? 'Resume' : 'View'}
                </Button>
            </Box>
        </Box>
    );
};

const Section = ({ icon, title, chips, children }) => (
    <Paper className="content-card ls-section" elevation={0}>
        <Box className="ls-section-head">
            <Box className="section-header">
                {icon}
                <Typography className="section-title">{title}</Typography>
            </Box>
            {chips}
        </Box>
        <Box className="ls-card-grid">{children}</Box>
    </Paper>
);

const ScoresheetList = ({ rows, error, notice, isLoading, onDelete }) => {
    const canEdit = canEditScoresheets();

    const drafts = rows.filter((row) => row.source === 'local');
    const submitted = rows.filter((row) => row.source !== 'local');

    // Newest season first, the way somebody looking for a recent dual expects.
    const seasons = [...new Set(submitted.map((row) => seasonOf(row.matchDate)))].sort((a, b) =>
        b.localeCompare(a),
    );

    return (
        <Box className="modern-page">
            <PageHero
                title="Scoresheets"
                subtitle="Every dual scored bout by bout, and the sheet behind each result."
            />

            <Container maxWidth="lg" className="page-content">
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {notice && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        {notice}
                    </Alert>
                )}

                <Box className="ls-list-actions">
                    {canEdit ? (
                        <>
                            <Typography variant="body2" className="ls-signed-in">
                                Signed in as <strong>{getCurrentUser()?.username}</strong>
                            </Typography>
                            <Button
                                size="small"
                                color="inherit"
                                startIcon={<LogoutIcon />}
                                onClick={() => {
                                    logout();
                                    window.location.reload();
                                }}
                            >
                                Sign out
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/scoresheet/new"
                                variant="contained"
                                startIcon={<AddIcon />}
                                className="ls-primary-button"
                                size="large"
                            >
                                New scoresheet
                            </Button>
                        </>
                    ) : (
                        <Button
                            component={RouterLink}
                            to="/scoresheet/login"
                            variant="outlined"
                            startIcon={<LoginIcon />}
                        >
                            Sign in to score
                        </Button>
                    )}
                </Box>

                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress />
                    </Box>
                )}

                {!isLoading && rows.length === 0 && !error && (
                    <Paper className="ls-empty" elevation={0}>
                        <Typography variant="h6" className="ls-empty-title">
                            No scoresheets yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {canEdit
                                ? 'Start one when the dual begins. It saves to this device as you score.'
                                : 'Duals scored on this site will appear here.'}
                        </Typography>
                    </Paper>
                )}

                {/* Unfinished duals first: they are the ones somebody is
                    coming back to, and they exist nowhere but this device. */}
                {drafts.length > 0 && (
                    <Section
                        icon={<PhoneIphoneIcon className="section-title-icon" />}
                        title="Still being scored"
                        chips={
                            <Chip
                                size="small"
                                label="Not submitted"
                                className="ls-card-chip ls-card-chip-progress"
                                variant="outlined"
                            />
                        }
                    >
                        {drafts.map((row) => (
                            <ScoresheetCard key={row.key} row={row} canEdit={canEdit} onDelete={onDelete} />
                        ))}
                    </Section>
                )}

                {seasons.map((season) => {
                    const seasonRows = submitted.filter((row) => seasonOf(row.matchDate) === season);
                    const wins = seasonRows.filter((row) => outcomeOf(row) === 'win').length;
                    const losses = seasonRows.filter((row) => outcomeOf(row) === 'loss').length;

                    return (
                        <Section
                            key={season}
                            icon={<CalendarMonthIcon className="section-title-icon" />}
                            title={season === 'Undated' ? 'Undated' : `Season ${season}`}
                            chips={
                                <Box className="ls-section-chips">
                                    <Chip size="small" label={`${wins}W`} className="ls-card-chip ls-card-chip-win" />
                                    <Chip size="small" label={`${losses}L`} className="ls-card-chip ls-card-chip-loss" />
                                </Box>
                            }
                        >
                            {seasonRows.map((row) => (
                                <ScoresheetCard key={row.key} row={row} canEdit={canEdit} onDelete={onDelete} />
                            ))}
                        </Section>
                    );
                })}
            </Container>
        </Box>
    );
};

export default ScoresheetList;
