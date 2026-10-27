import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BoutGrid from './BoutGrid';
import BoutPanel from './BoutPanel';
import QuickResult from './QuickResult';
import { getScoresheet, dualSheetFromServer, tournamentSheetFromServer } from '../services/scoresheetApi';
import { SIDE_OURS, SIDE_THEIRS, deriveLiveDual, rulesForDate } from '../scoring/liveBout';
import { MODE_QUICK, deriveTournamentBout, describeResult } from '../scoring/tournamentBout';
import '../styles/liveScoresheet.css';

/** The forfeit labels a read-only bout can show; nothing here is pressed. */
const TOURNAMENT_FORFEITS = [
    { value: SIDE_OURS, label: 'We forfeit' },
    { value: SIDE_THEIRS, label: 'They forfeit' },
];

const noop = () => {};

/** One tournament bout, read-only: how it ended, and every mark on it. */
const TournamentSheetView = ({ sheet }) => {
    const derived = useMemo(() => deriveTournamentBout(sheet), [sheet]);
    const { bout } = sheet;
    const summary = describeResult(derived);
    const time = String(bout.fallTime || '').trim();

    return (
        <>
            <Box className="ls-dialog-head">
                <Typography className="ls-dialog-title">{sheet.tournament}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {sheet.matchDate} &middot; {bout.weight} lbs
                    {sheet.opponentSchool ? ` · vs ${sheet.opponentSchool}` : ''}
                    {time ? ` · time ${time}` : ''}
                </Typography>
                {summary && <Typography className="ls-dialog-result">{summary}</Typography>}
            </Box>

            <BoutPanel
                bout={bout}
                roster={[]}
                rules={rulesForDate(sheet.matchDate)}
                result={derived.result ? derived : null}
                readOnly
                forfeitOptions={TOURNAMENT_FORFEITS}
                showTeamPoints={false}
                showFinal={false}
                describeForfeit={(side) =>
                    side === SIDE_OURS
                        ? 'We forfeited this bout. Nothing was recorded for our wrestler.'
                        : 'The opponent forfeited: a win by forfeit.'
                }
                onSetWrestler={noop}
                onSetOpponent={noop}
            >
                {bout.mode === MODE_QUICK ? <QuickResult bout={bout} onChange={noop} readOnly /> : null}
            </BoutPanel>
        </>
    );
};

/**
 * A dual, read-only, opened to one bout.
 *
 * The whole sheet is the scoresheet, so the grid is shown in full; the bout
 * the row was clicked from is the one picked out underneath, and any other row
 * can be tapped to look at that bout instead.
 */
const DualSheetView = ({ sheet, weight }) => {
    const dual = useMemo(() => deriveLiveDual(sheet), [sheet]);
    const firstWeight = sheet.bouts.length ? sheet.bouts[0].weight : null;
    const [activeWeight, setActiveWeight] = useState(
        sheet.bouts.some((b) => b.weight === Number(weight)) ? Number(weight) : firstWeight,
    );
    const bout = sheet.bouts.find((b) => b.weight === activeWeight);

    return (
        <>
            <Box className="ls-dialog-head">
                <Typography className="ls-dialog-title">
                    {sheet.venue === 'Away' ? 'at ' : 'vs '}
                    {sheet.opponentSchool}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {sheet.matchDate} &middot; Towson {dual.ourScore}&ndash;{dual.opponentScore}
                </Typography>
            </Box>

            <BoutGrid
                bouts={sheet.bouts}
                activeWeight={activeWeight}
                resultsByWeight={dual.byWeight}
                onSelectBout={setActiveWeight}
            />

            {bout && (
                <Box sx={{ mt: 2 }}>
                    <BoutPanel
                        bout={bout}
                        roster={[]}
                        rules={rulesForDate(sheet.matchDate)}
                        result={dual.byWeight[bout.weight]}
                        readOnly
                        onSetWrestler={noop}
                        onSetOpponent={noop}
                    />
                </Box>
            )}
        </>
    );
};

/**
 * The scoresheet behind a bout, without leaving the page it was opened from.
 *
 * `weight` picks the bout out of a dual; a tournament sheet only has one.
 */
const ScoresheetDialog = ({ scoresheetId, weight, onClose }) => {
    const fullScreen = useMediaQuery('(max-width: 599px)');
    const [sheet, setSheet] = useState(null);
    const [error, setError] = useState(null);
    const open = Boolean(scoresheetId);

    useEffect(() => {
        if (!scoresheetId) return undefined;
        let cancelled = false;
        setSheet(null);
        setError(null);

        getScoresheet(scoresheetId)
            .then(({ data }) => {
                if (cancelled) return;
                setSheet(
                    data.kind === 'tournament'
                        ? { kind: 'tournament', ...tournamentSheetFromServer(data) }
                        : { kind: 'dual', ...dualSheetFromServer(data) },
                );
            })
            .catch((err) => {
                if (cancelled) return;
                setError(
                    err?.response?.status === 404
                        ? 'That scoresheet no longer exists.'
                        : 'The scoresheet could not be loaded.',
                );
            });

        return () => {
            cancelled = true;
        };
    }, [scoresheetId]);

    const fullPage = sheet?.kind === 'tournament' ? `/scoresheet/tournament/${scoresheetId}` : `/scoresheet/${scoresheetId}`;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            fullScreen={fullScreen}
            className="ls-dialog ls-sheet-dialog"
        >
            <DialogTitle>Scoresheet</DialogTitle>
            <DialogContent dividers className="app-fields">
                {error && <Alert severity="error">{error}</Alert>}
                {!error && !sheet && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress />
                    </Box>
                )}
                {sheet && sheet.kind === 'tournament' && <TournamentSheetView sheet={sheet} />}
                {sheet && sheet.kind === 'dual' && <DualSheetView key={sheet.id} sheet={sheet} weight={weight} />}
            </DialogContent>
            <DialogActions>
                {sheet && (
                    <Button component={RouterLink} to={fullPage} color="inherit">
                        Open full page
                    </Button>
                )}
                <Button onClick={onClose} variant="contained" className="ls-primary-button">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

/**
 * A Scoresheet column for a bout table, and the dialog it opens.
 *
 * Every table of bouts on the site gets the same first column, so this hands
 * back both halves: the column to put first, and the dialog to render once
 * beside the table. Bouts entered by hand have no sheet and show a dash, the
 * same as the team match list.
 */
export const useScoresheetColumn = () => {
    const [selected, setSelected] = useState(null);

    const column = {
        field: 'scoresheet_id',
        headerName: 'Scoresheet',
        width: 110,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) =>
            params.row.scoresheet_id ? (
                <Tooltip title="View the scoresheet for this bout">
                    <IconButton
                        size="small"
                        // Room for a thumb: the rows are taller than this anyway.
                        sx={{ width: 40, height: 40 }}
                        className="ls-sheet-link"
                        aria-label={`View the scoresheet for ${params.row.wrestler_name} against ${
                            params.row.opponent_name || 'the opponent'
                        }`}
                        onClick={(event) => {
                            // The grid would otherwise treat the press as a row click.
                            event.stopPropagation();
                            setSelected({ id: params.row.scoresheet_id, weight: params.row.weight_class });
                        }}
                    >
                        <DescriptionOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ) : (
                <span className="ls-sheet-none">&mdash;</span>
            ),
    };

    const dialog = (
        <ScoresheetDialog
            scoresheetId={selected?.id}
            weight={selected?.weight}
            onClose={() => setSelected(null)}
        />
    );

    return { column, dialog };
};

export default ScoresheetDialog;
