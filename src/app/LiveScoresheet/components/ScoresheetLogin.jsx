import React, { useState } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PageHero from '../../common/Header/PageHero';
import { login } from '../services/scoresheetAuth';
import '../styles/liveScoresheet.css';

/**
 * Signing in to score.
 *
 * Only needed to create or score a dual -- browsing scoresheets never asks for
 * this, which is why the page says so rather than leaving somebody wondering
 * whether they are locked out of something they could already see.
 */
const ScoresheetLogin = () => {
    const history = useHistory();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);

    const returnTo = new URLSearchParams(location.search).get('next') || '/scoresheet';

    const submit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            setError('Enter your username and password.');
            return;
        }

        setBusy(true);
        setError(null);

        try {
            const user = await login(username.trim(), password);
            if (!user.isStaff) {
                setError(
                    'That account can view scoresheets but not score them. Ask for staff access if you need to.',
                );
                setBusy(false);
                return;
            }
            history.replace(returnTo);
        } catch (err) {
            const status = err?.response?.status;
            if (status === 401) setError('That username and password do not match.');
            else if (status === 503) setError('Signing in is not configured on this server yet.');
            else setError('Could not sign in. Check your connection and try again.');
            setBusy(false);
        }
    };

    return (
        <>
            <PageHero title="Sign in" subtitle="Only needed to score a dual — anyone can read scoresheets." />
            <Container maxWidth="xs" className="ls-page">
                <Paper component="form" onSubmit={submit} className="ls-setup-card" elevation={0}>
                    <Stack spacing={3}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            autoFocus
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            fullWidth
                        />

                        <Box className="ls-setup-actions">
                            <Button component={RouterLink} to="/scoresheet" color="inherit">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                className="ls-primary-button"
                                disabled={busy}
                            >
                                {busy ? 'Signing in…' : 'Sign in'}
                            </Button>
                        </Box>

                        <Typography variant="caption" color="text.secondary">
                            Use the same account you use for the admin panel.
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};

export default ScoresheetLogin;
