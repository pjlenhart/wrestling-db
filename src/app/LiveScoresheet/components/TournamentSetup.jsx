import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PageHero from '../../common/Header/PageHero';
import { WEIGHT_CLASSES } from '../scoring/liveBout';
import '../styles/liveScoresheet.css';

const today = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
};

/**
 * Starting one tournament bout.
 *
 * The tournament, date and weight are required. The rest is often not known
 * until the bout is called, so it can be filled in here or at the mat.
 */
const TournamentSetup = ({ tournaments, roster, schools, error, onCreate }) => {
    const [tournament, setTournament] = useState('');
    const [matchDate, setMatchDate] = useState(today());
    const [weight, setWeight] = useState('');
    const [wrestler, setWrestler] = useState(null);
    const [opponent, setOpponent] = useState('');
    const [school, setSchool] = useState(null);
    const [schoolText, setSchoolText] = useState('');
    const [touched, setTouched] = useState(false);

    const missingTournament = !tournament.trim();
    const missingDate = !matchDate;
    const missingWeight = weight === '';

    const submit = (event) => {
        event.preventDefault();
        setTouched(true);
        if (missingTournament || missingDate || missingWeight) return;

        onCreate({
            tournament: tournament.trim(),
            matchDate,
            weight: Number(weight),
            wrestlerId: wrestler ? wrestler.wrestler_id : null,
            wrestler: wrestler ? wrestler.wrestler_name : '',
            opponent: opponent.trim(),
            opponentSchool: school ? school.school_name : schoolText.trim(),
            opponentSchoolId: school ? school.school_id : null,
        });
    };

    return (
        <>
            <PageHero
                title="New tournament bout"
                subtitle="One bout at a time. Score it live, or enter the result from the bracket."
            />
            <Container maxWidth="sm" className="ls-page app-fields">
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Paper component="form" onSubmit={submit} className="ls-setup-card" elevation={0}>
                    <Stack spacing={3}>
                        {/* Free text, but offered the names already on record so
                            this year's bouts land under last year's spelling. */}
                        <Autocomplete
                            freeSolo
                            options={tournaments.map((t) => t.tournament)}
                            inputValue={tournament}
                            onInputChange={(_e, value) => setTournament(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tournament"
                                    placeholder="Start typing a tournament"
                                    error={touched && missingTournament}
                                    helperText={
                                        touched && missingTournament
                                            ? 'A tournament is required.'
                                            : 'Pick last year’s name if it is the same event.'
                                    }
                                />
                            )}
                        />

                        {/* Side by side, the date is cut off on a phone. */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                label="Date"
                                type="date"
                                value={matchDate}
                                onChange={(e) => setMatchDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                error={touched && missingDate}
                                helperText={touched && missingDate ? 'A date is required.' : 'The day of this bout.'}
                                fullWidth
                            />
                            <TextField
                                select
                                label="Weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                error={touched && missingWeight}
                                helperText={touched && missingWeight ? 'Pick a weight.' : ' '}
                                sx={{ minWidth: 130 }}
                            >
                                {WEIGHT_CLASSES.map((w) => (
                                    <MenuItem key={w} value={w}>
                                        {w}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>

                        <Autocomplete
                            options={roster}
                            value={wrestler}
                            onChange={(_e, value) => setWrestler(value)}
                            getOptionLabel={(option) => option.wrestler_name || ''}
                            isOptionEqualToValue={(option, value) => option.wrestler_id === value.wrestler_id}
                            renderInput={(params) => (
                                <TextField {...params} label="Our wrestler" helperText="Can be picked later." />
                            )}
                        />

                        <TextField
                            label="Opponent"
                            value={opponent}
                            onChange={(e) => setOpponent(e.target.value)}
                            placeholder="F. Kakos"
                            helperText="Can be filled in later."
                            fullWidth
                        />

                        <Autocomplete
                            freeSolo
                            options={schools}
                            value={school}
                            onChange={(_e, value) => {
                                if (typeof value === 'string') {
                                    setSchool(null);
                                    setSchoolText(value);
                                } else {
                                    setSchool(value);
                                    setSchoolText(value ? value.school_name : '');
                                }
                            }}
                            inputValue={schoolText}
                            onInputChange={(_e, value) => setSchoolText(value)}
                            getOptionLabel={(option) => (typeof option === 'string' ? option : option.school_name || '')}
                            isOptionEqualToValue={(option, value) => option.school_id === value.school_id}
                            renderOption={(props, option) => (
                                <li {...props} key={option.school_id}>
                                    <Box>
                                        <Typography variant="body2">{option.school_name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {[option.city, option.state].filter(Boolean).join(', ')}
                                        </Typography>
                                    </Box>
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Opponent's school"
                                    helperText="Not in the directory? Type it in."
                                />
                            )}
                        />

                        <Box className="ls-setup-actions">
                            <Button component={RouterLink} to="/scoresheet" color="inherit">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large" className="ls-primary-button">
                                Start bout
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};

export default TournamentSetup;
