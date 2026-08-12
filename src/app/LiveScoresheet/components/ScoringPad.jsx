import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { SIDE_OURS, SIDE_THEIRS, TERMINAL_ACTIONS, buildScoringActions } from '../scoring/liveBout';
import '../styles/liveScoresheet.css';

/**
 * One side's buttons.
 *
 * The pad is two panels rather than one shared set of buttons because that is
 * how a scorer thinks: find the wrestler who scored, then press what they did.
 * Nothing here decides anything -- every press just appends a token to the
 * period that is currently selected.
 */
const SidePad = ({ side, name, points, actions, period, onScore, disabled, tone }) => (
    <Box className={`ls-pad-side ls-pad-${tone}`}>
        <Box className="ls-pad-header">
            <Typography className="ls-pad-name" noWrap title={name}>
                {name || (side === SIDE_OURS ? 'Our wrestler' : 'Opponent')}
            </Typography>
            <Typography className="ls-pad-points">{points}</Typography>
        </Box>

        <Box className="ls-pad-grid">
            {actions.map((action) => (
                <Button
                    key={action.token}
                    variant="outlined"
                    className="ls-pad-button"
                    disabled={disabled}
                    onClick={() => onScore({ side, period, token: action.token })}
                    title={`${action.label} (${action.token})`}
                >
                    <span className="ls-pad-button-label">{action.label}</span>
                    <span className="ls-pad-button-meta">
                        <span className="ls-pad-button-points">+{action.points}</span>
                        <span className="ls-code">{action.token}</span>
                    </span>
                </Button>
            ))}
        </Box>

        <Divider className="ls-pad-divider" />

        {/* A bout-ending mark sits on the line of the wrestler it decided in
            favour of, so this row has to read as 'wins by', not 'was'. */}
        <Typography className="ls-pad-terminal-label">Wins by</Typography>
        <Box className="ls-pad-terminal">
            {TERMINAL_ACTIONS.map((action) => (
                <Button
                    key={action.token}
                    variant="text"
                    size="small"
                    className="ls-pad-terminal-button"
                    disabled={disabled}
                    onClick={() => onScore({ side, period, token: action.token })}
                    title={action.label}
                >
                    {action.short}
                </Button>
            ))}
        </Box>
    </Box>
);

const ScoringPad = ({ bout, rules, period, score, onScore, disabled, hint }) => {
    const actions = buildScoringActions(rules);

    return (
        <>
            <Typography className={`ls-pad-hint${disabled ? ' ls-pad-hint-blocked' : ''}`}>
                {hint || 'Tap what happened, under the wrestler who earned it.'}
            </Typography>
            <Box className="ls-pad">
                <SidePad
                    side={SIDE_OURS}
                    tone="ours"
                    name={bout.wrestler}
                    points={score.ours}
                    actions={actions}
                    period={period}
                    onScore={onScore}
                    disabled={disabled}
                />
                <SidePad
                    side={SIDE_THEIRS}
                    tone="theirs"
                    name={bout.opponent}
                    points={score.theirs}
                    actions={actions}
                    period={period}
                    onScore={onScore}
                    disabled={disabled}
                />
            </Box>
        </>
    );
};

export default ScoringPad;
