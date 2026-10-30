import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { playlistIdFor, playlistUrl, videoIdsFor, watchUrl } from './matchVideos';
import './video.css';

// Opens on YouTube in a new tab, so the table the link came from stays put.
const external = { target: '_blank', rel: 'noopener noreferrer' };

// The grid would otherwise treat a press on the link as a row click.
const stopRowClick = (event) => event.stopPropagation();

const NoVideo = () => <span className="video-none">&mdash;</span>;

/**
 * The YouTube link for one bout, or a dash when it wasn't filmed.
 *
 * A bout filmed in parts gets a short menu of them instead of a single link.
 */
export const BoutVideoLink = ({ matchId, label }) => {
    const [anchor, setAnchor] = useState(null);
    const ids = videoIdsFor(matchId);
    if (!ids.length) return <NoVideo />;

    if (ids.length === 1) {
        return (
            <Tooltip title="Watch this bout on YouTube">
                <IconButton
                    component="a"
                    href={watchUrl(ids[0])}
                    {...external}
                    size="small"
                    sx={{ width: 40, height: 40 }}
                    className="video-link"
                    aria-label={`Watch ${label} on YouTube`}
                    onClick={stopRowClick}
                >
                    <YouTubeIcon />
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <>
            <Tooltip title={`Watch this bout on YouTube (${ids.length} parts)`}>
                <IconButton
                    size="small"
                    sx={{ width: 40, height: 40 }}
                    className="video-link"
                    aria-label={`Watch ${label} on YouTube, ${ids.length} parts`}
                    aria-haspopup="menu"
                    onClick={(event) => {
                        stopRowClick(event);
                        setAnchor(event.currentTarget);
                    }}
                >
                    <YouTubeIcon />
                    <span className="video-parts">{ids.length}</span>
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
                {ids.map((id, index) => (
                    <MenuItem
                        key={id}
                        component="a"
                        href={watchUrl(id)}
                        {...external}
                        onClick={() => setAnchor(null)}
                    >
                        Part {index + 1}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

/** The YouTube playlist of a whole dual, or a dash when it wasn't filmed. */
export const DualPlaylistLink = ({ teamMatchId, opponent }) => {
    const id = playlistIdFor(teamMatchId);
    if (!id) return <NoVideo />;
    return (
        <Tooltip title="Watch this dual on YouTube">
            <IconButton
                component="a"
                href={playlistUrl(id)}
                {...external}
                size="small"
                className="video-link"
                aria-label={`Watch the dual against ${opponent} on YouTube`}
            >
                <YouTubeIcon />
            </IconButton>
        </Tooltip>
    );
};

/** A Video column for a bout table: the first one after the checkboxes. */
export const videoColumn = {
    field: 'video',
    headerName: 'Video',
    width: 70,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    disableExport: true,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
        <BoutVideoLink
            matchId={params.row.match_id}
            label={`${params.row.wrestler_name} against ${params.row.opponent_name || 'the opponent'}`}
        />
    ),
};
