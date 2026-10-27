import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { PERIOD_ORDER, SIDE_OURS, SIDE_THEIRS } from '../scoring/liveBout';
import { DECISION, QUICK_METHODS } from '../scoring/tournamentBout';
import { PERIOD_LABELS } from './BoutPanel';
import '../styles/liveScoresheet.css';

const METHOD_LABELS = {
    [DECISION]: 'Decision (minor or major, by the score)',
};

/**
 * A bout entered from its result alone.
 *
 * This is what a bracket or TrackWrestling gives you when nobody was matside
 * to tap it out: who won, how, when, and the score. It records no breakdown,
 * and nothing here pretends otherwise.
 */
const QuickResult = ({ bout, onChange, readOnly }) => {
    const quick = bout.quick || {};
    const ourName = bout.wrestler || 'Our wrestler';
    const theirName = bout.opponent || 'Opponent';
    const set = (patch) => onChange({ ...quick, ...patch });

    return (
        <Stack spacing={2} className="ls-quick">
            <Typography variant="body2" color="text.secondary">
                Only the result is recorded, with no scoring breakdown. Switch to live scoring if you are
                watching the bout.
            </Typography>

            <Box>
                <Typography variant="caption" className="ls-field-label">
                    Winner
                </Typography>
                <ToggleButtonGroup
                    value={quick.winner || null}
                    exclusive
                    fullWidth
                    size="small"
                    onChange={(_e, value) => value && set({ winner: value })}
                >
                    <ToggleButton value={SIDE_OURS} disabled={readOnly}>
                        {ourName}
                    </ToggleButton>
                    <ToggleButton value={SIDE_THEIRS} disabled={readOnly}>
                        {theirName}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <TextField
                select
                label="How it ended"
                value={quick.method || ''}
                onChange={(e) => set({ method: e.target.value })}
                disabled={readOnly}
                size="small"
                fullWidth
            >
                {QUICK_METHODS.map((method) => (
                    <MenuItem key={method} value={method}>
                        {METHOD_LABELS[method] || method}
                    </MenuItem>
                ))}
            </TextField>

            <Box>
                <Typography variant="caption" className="ls-field-label">
                    Ended in
                </Typography>
                <ToggleButtonGroup
                    value={quick.period || null}
                    exclusive
                    size="small"
                    className="ls-period-group"
                    onChange={(_e, value) => value && set({ period: value })}
                >
                    {PERIOD_ORDER.map((column) => (
                        <ToggleButton key={column} value={column} disabled={readOnly}>
                            {PERIOD_LABELS[column]}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            <Stack direction="row" spacing={2}>
                <TextField
                    label={`${ourName} score`}
                    type="number"
                    inputProps={{ min: 0, inputMode: 'numeric' }}
                    value={quick.pointsFor ?? ''}
                    onChange={(e) => set({ pointsFor: e.target.value })}
                    disabled={readOnly}
                    size="small"
                    fullWidth
                />
                <TextField
                    label={`${theirName} score`}
                    type="number"
                    inputProps={{ min: 0, inputMode: 'numeric' }}
                    value={quick.pointsAgainst ?? ''}
                    onChange={(e) => set({ pointsAgainst: e.target.value })}
                    disabled={readOnly}
                    size="small"
                    fullWidth
                />
            </Stack>
        </Stack>
    );
};

export default QuickResult;
