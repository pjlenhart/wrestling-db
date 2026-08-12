import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { buildScoringActions } from '../scoring/liveBout';
import '../styles/liveScoresheet.css';

/**
 * The bit of the paper scorebook a first-time scorer does not have.
 *
 * Opens by itself the first time somebody scores on this device and stays shut
 * after that, so it teaches once without nagging an experienced scorer.
 */

const SEEN_KEY = 'wrestlingdb.scoringHelpSeen.v1';

const seenBefore = () => {
    try {
        return window.localStorage.getItem(SEEN_KEY) === 'true';
    } catch (err) {
        return true;
    }
};

const markSeen = () => {
    try {
        window.localStorage.setItem(SEEN_KEY, 'true');
    } catch (err) {
        /* a help panel that reopens is not worth reporting */
    }
};

const STEPS = [
    'Pick your wrestler and type the opponent’s name.',
    'Choose the period you are scoring in — it stays put until you change it.',
    'Tap what happened, under whichever wrestler earned it.',
    'Press “Bout final” when the bout ends. Only final bouts count toward the team score.',
    'Press “Finish” at the top when the whole dual is done.',
];

const OUTCOMES = [
    ['Pin, forfeit, DQ, default', '6'],
    ['Tech fall — ahead by 15', '5'],
    ['Major decision — ahead by 8', '4'],
    ['Decision — any other win', '3'],
    ['Double forfeit', '0'],
];

const ScoringHelp = ({ rules }) => {
    const [open, setOpen] = useState(() => !seenBefore());
    const actions = buildScoringActions(rules);

    const toggle = (_event, expanded) => {
        setOpen(expanded);
        if (!expanded) markSeen();
    };

    return (
        <Accordion expanded={open} onChange={toggle} className="ls-help" elevation={0} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="ls-help-summary">
                <HelpOutlineIcon fontSize="small" className="ls-help-icon" />
                <Typography className="ls-help-title">New to scoring? Start here</Typography>
            </AccordionSummary>
            <AccordionDetails className="ls-help-details">
                <Box component="ol" className="ls-help-steps">
                    {STEPS.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </Box>

                <Typography className="ls-help-heading">What the buttons mean</Typography>
                <Box className="ls-help-legend">
                    {actions.map((action) => (
                        <Box key={action.token} className="ls-help-legend-row">
                            <span className="ls-help-legend-name">{action.label}</span>
                            <span className="ls-code">{action.token}</span>
                            <span className="ls-help-legend-points">+{action.points}</span>
                        </Box>
                    ))}
                </Box>
                <Typography variant="caption" color="text.secondary" className="ls-help-note">
                    Near fall is back points — awarded for holding an opponent’s shoulders toward the mat. The
                    code beside each action is the shorthand written in the paper book.
                </Typography>

                <Typography className="ls-help-heading">What a win is worth</Typography>
                <Box className="ls-help-legend">
                    {OUTCOMES.map(([what, worth]) => (
                        <Box key={what} className="ls-help-legend-row">
                            <span className="ls-help-legend-name">{what}</span>
                            <span className="ls-help-legend-points">{worth}</span>
                        </Box>
                    ))}
                </Box>
                <Typography variant="caption" color="text.secondary" className="ls-help-note">
                    The “Wins by” row sits under the <strong>winner</strong>. Tapping PIN under your wrestler
                    means your wrestler won by pin. You never add the score up yourself — it is worked out as you
                    tap.
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default ScoringHelp;
