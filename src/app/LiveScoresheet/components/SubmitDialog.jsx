import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { isDecided } from '../scoring/liveBout';
import '../styles/liveScoresheet.css';

/**
 * Finishing a dual.
 *
 * On a photographed sheet the team score is written down independently, and
 * checking it against what the bouts add up to is what catches a misread. A
 * live sheet computes that number itself, so the check would be circular --
 * which is why the official score is asked for here instead. It comes off the
 * scorer's book, and a disagreement means something in the card is wrong.
 */
const SubmitDialog = ({ open, draft, dual, onClose, onConfirm }) => {
    const [ourScore, setOurScore] = useState('');
    const [opponentScore, setOpponentScore] = useState('');
    const [acknowledged, setAcknowledged] = useState(false);

    const undecided = (draft.bouts || []).filter((bout) => !isDecided(bout));

    const entered = ourScore !== '' && opponentScore !== '';
    const mismatch =
        entered && (Number(ourScore) !== dual.ourScore || Number(opponentScore) !== dual.opponentScore);

    const blocked = (mismatch && !acknowledged) || dual.errors.length > 0;

    const confirm = () =>
        onConfirm({
            officialOurScore: ourScore === '' ? null : Number(ourScore),
            officialOpponentScore: opponentScore === '' ? null : Number(opponentScore),
        });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Finish this dual</DialogTitle>
            <DialogContent dividers>
                <Box className="ls-submit-score">
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Bouts add up to
                        </Typography>
                        <Typography className="ls-submit-score-value">
                            {dual.ourScore} &ndash; {dual.opponentScore}
                        </Typography>
                    </Box>
                </Box>

                {dual.errors.length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        <AlertTitle>These bouts cannot be scored</AlertTitle>
                        {dual.errors.map((message, index) => (
                            <div key={index}>{message}</div>
                        ))}
                    </Alert>
                )}

                {dual.warnings.length > 0 && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>Worth a look</AlertTitle>
                        {dual.warnings.map((message, index) => (
                            <div key={index}>{message}</div>
                        ))}
                    </Alert>
                )}

                {undecided.length > 0 && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        {undecided.length} bout{undecided.length === 1 ? '' : 's'} not marked final yet:{' '}
                        {undecided.map((bout) => bout.weight).join(', ')}. They will not count toward the score.
                    </Alert>
                )}

                <Typography variant="body2" sx={{ mb: 2 }}>
                    Enter the final score from the official book. If it disagrees with the bouts above, something
                    in the card is wrong.
                </Typography>

                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Our score"
                        type="number"
                        value={ourScore}
                        onChange={(e) => {
                            setOurScore(e.target.value);
                            setAcknowledged(false);
                        }}
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="Their score"
                        type="number"
                        value={opponentScore}
                        onChange={(e) => {
                            setOpponentScore(e.target.value);
                            setAcknowledged(false);
                        }}
                        size="small"
                        fullWidth
                    />
                </Stack>

                {mismatch && (
                    <Alert
                        severity="error"
                        sx={{ mt: 2 }}
                        action={
                            <Button color="inherit" size="small" onClick={() => setAcknowledged(true)}>
                                Save anyway
                            </Button>
                        }
                    >
                        The book says {ourScore}&ndash;{opponentScore}, but the bouts add up to {dual.ourScore}
                        &ndash;{dual.opponentScore}.
                    </Alert>
                )}

                {mismatch && acknowledged && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        Saving with a score that does not reconcile.
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Keep scoring
                </Button>
                <Button onClick={confirm} variant="contained" className="ls-primary-button" disabled={blocked}>
                    Finish dual
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubmitDialog;
