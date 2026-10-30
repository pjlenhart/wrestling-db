import React from 'react';
import { render, screen, within } from '@testing-library/react';
import BoutSummaryDialog from './BoutSummaryDialog';

jest.mock('../../common/video/matchVideos.json', () => ({ bouts: { 2511: ['vid2511'] }, duals: {} }));

const dualBout = {
    match_id: 2511,
    wrestler_name: 'Josh D',
    opponent_name: 'O. Imode',
    school_name: 'Edgewood',
    weight_class: 285,
    match_date: '2026-02-10',
    match_result: 'Win',
    match_stats: {
        has_breakdown: true,
        method_of_result: 'Major Decision',
        period: '3rd',
        team_points_earned: 4,
        takedowns_for: 3,
        takedown_points_for: 9,
        takedowns_against: 0,
        escapes_against: 2,
        escape_points_against: 2,
        nearfall_for: 1,
        nearfall_points_for: 3,
        total_points_for: 12,
        total_points_against: 2,
    },
};

const tournamentBout = {
    match_id: 1831,
    wrestler_name: 'Will W',
    opponent_name: 'P. Hutchins',
    school_name: 'Jackson Reed',
    weight_class: 132,
    match_date: '2025-12-05',
    match_result: 'Win',
    match_stats: {
        has_breakdown: false,
        tournament: 'Parkville Knightmare Invitational',
        method_of_result: 'Pin',
        period: '1st',
        match_time: '00:01:12',
        points_for: 3,
        points_against: 0,
    },
};

describe('BoutSummaryDialog', () => {
    it('shows a dual bout with its scoring breakdown and video', () => {
        render(<BoutSummaryDialog match={dualBout} onClose={() => {}} />);
        expect(screen.getByText('Josh D vs O. Imode')).toBeInTheDocument();
        expect(screen.getByText(/Dual vs Edgewood · 2\/10\/2026 · 285 lbs/)).toBeInTheDocument();
        expect(screen.getByText('Win · Major Decision · 3rd period · 12–2')).toBeInTheDocument();
        expect(screen.getByText('4 team points for Towson')).toBeInTheDocument();

        const table = screen.getByRole('table', { name: 'Scoring breakdown' });
        const cells = (label) =>
            within(within(table).getByRole('rowheader', { name: label }).closest('tr'))
                .getAllByRole('cell')
                .map((c) => c.textContent);
        expect(cells('Takedowns')).toEqual(['3', '9', '0', '0']);
        expect(cells('Escapes')).toEqual(['0', '0', '2', '2']);
        expect(cells('Near falls')).toEqual(['1', '3', '0', '0']);
        expect(cells('Total')).toEqual(['', '12', '', '2']);

        expect(screen.getByRole('link', { name: /Watch on YouTube/ })).toHaveAttribute(
            'href',
            'https://www.youtube.com/watch?v=vid2511',
        );
    });

    it('says so when only the score was recorded', () => {
        render(<BoutSummaryDialog match={tournamentBout} onClose={() => {}} />);
        expect(
            screen.getByText(/Parkville Knightmare Invitational · Jackson Reed · 12\/5\/2025 · 132 lbs/),
        ).toBeInTheDocument();
        expect(screen.getByText('Win · Pin · 1st period · 1:12 · 3–0')).toBeInTheDocument();
        expect(screen.getByText(/Only the result and score were recorded/)).toBeInTheDocument();
        expect(screen.queryByRole('table')).toBeNull();
        expect(screen.queryByRole('link', { name: /YouTube/ })).toBeNull();
    });

    it('shows nothing to break down for a forfeit', () => {
        const forfeit = {
            ...dualBout,
            match_stats: { method_of_result: 'Forfeit', period: '1st', total_points_for: 0, total_points_against: 0, team_points_earned: 6 },
        };
        render(<BoutSummaryDialog match={forfeit} onClose={() => {}} />);
        expect(screen.getByText('Win · Forfeit')).toBeInTheDocument();
        expect(screen.queryByRole('table')).toBeNull();
        expect(screen.queryByText(/Only the result/)).toBeNull();
        expect(screen.getByText(/No match was wrestled/)).toBeInTheDocument();
    });

    it('is closed without a bout', () => {
        render(<BoutSummaryDialog match={null} onClose={() => {}} />);
        expect(screen.queryByRole('dialog')).toBeNull();
    });
});
