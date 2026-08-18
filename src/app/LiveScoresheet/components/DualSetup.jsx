import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import PageHero from '../../common/Header/PageHero';
import { WEIGHT_CLASSES, boutOrder } from '../scoring/liveBout';
import '../styles/liveScoresheet.css';

const today = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
};

const DualSetup = ({ schools, isLoading, error, onCreate }) => {
    const [matchDate, setMatchDate] = useState(today());
    const [opponent, setOpponent] = useState(null);
    const [opponentText, setOpponentText] = useState('');
    const [venue, setVenue] = useState('Home');
    const [startingWeight, setStartingWeight] = useState('');
    const [touched, setTouched] = useState(false);

    const opponentName = opponent ? opponent.school_name : opponentText.trim();
    const missingOpponent = !opponentName;
    const missingDate = !matchDate;

    const submit = (event) => {
        event.preventDefault();
        setTouched(true);
        if (missingOpponent || missingDate) return;

        onCreate({
            matchDate,
            opponentSchool: opponentName,
            opponentSchoolId: opponent ? opponent.school_id : null,
            venue,
            startingWeight: startingWeight || null,
        });
    };

    const order = startingWeight ? boutOrder(startingWeight) : WEIGHT_CLASSES;

    return (
        <>
            <PageHero title="New scoresheet" subtitle="Set the dual up once, then score it bout by bout." />
            <Container maxWidth="sm" className="ls-page">
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Paper component="form" onSubmit={submit} className="ls-setup-card" elevation={0}>
                    <Stack spacing={3}>
                        <TextField
                            label="Match date"
                            type="date"
                            value={matchDate}
                            onChange={(e) => setMatchDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            error={touched && missingDate}
                            helperText={touched && missingDate ? 'A date is required.' : ' '}
                            fullWidth
                        />

                        <Autocomplete
                            freeSolo
                            options={schools}
                            loading={isLoading}
                            value={opponent}
                            onChange={(_event, value) => {
                                if (typeof value === 'string') {
                                    setOpponent(null);
                                    setOpponentText(value);
                                } else {
                                    setOpponent(value);
                                    setOpponentText(value ? value.school_name : '');
                                }
                            }}
                            inputValue={opponentText}
                            onInputChange={(_event, value) => setOpponentText(value)}
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
                                    label="Opponent school"
                                    placeholder="Start typing a school"
                                    error={touched && missingOpponent}
                                    helperText={
                                        touched && missingOpponent
                                            ? 'An opponent is required.'
                                            : 'Not in the directory? Type it in.'
                                    }
                                />
                            )}
                        />

                        <Box>
                            <Typography variant="subtitle2" className="ls-field-label">
                                Venue
                            </Typography>
                            <ToggleButtonGroup
                                value={venue}
                                exclusive
                                onChange={(_event, value) => value && setVenue(value)}
                                fullWidth
                                size="small"
                            >
                                <ToggleButton value="Home">Home</ToggleButton>
                                <ToggleButton value="Away">Away</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Box>
                            <TextField
                                select
                                label="Starting weight (drawn)"
                                value={startingWeight}
                                onChange={(e) => setStartingWeight(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>No draw — start at 106</em>
                                </MenuItem>
                                {WEIGHT_CLASSES.map((weight) => (
                                    <MenuItem key={weight} value={weight}>
                                        {weight}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <FormHelperText>
                                Bouts will be laid out {order[0]} &rarr; {order[order.length - 1]}. You can still
                                score them in any order.
                            </FormHelperText>
                        </Box>

                        <Box className="ls-setup-actions">
                            <Button component={RouterLink} to="/scoresheet" color="inherit">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large" className="ls-primary-button">
                                Start scoring
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};

export default DualSetup;
