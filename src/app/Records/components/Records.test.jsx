import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { groupByWrestler } from './Records';
import RecordsTable from './RecordsTable';

const row = (wrestler_id, wrestler_name, season, wins, losses) => ({
    wrestler_id,
    wrestler_name,
    season,
    wins: String(wins),
    losses: String(losses),
    wins_by_pin: '1',
    team_points_earned: '12',
});

// Shaped like /statistics/career-stats: seasons oldest first, then Career.
const records = [
    row(1, 'Alison K', '2021-2022', 9, 7),
    row(1, 'Alison K', '2022-2023', 9, 11),
    row(1, 'Alison K', '2023-2024', 14, 4),
    row(1, 'Alison K', 'Career', 32, 22),
    row(2, 'Aiden S', '2025-2026', 0, 1),
    row(2, 'Aiden S', 'Career', 0, 1),
];

describe('groupByWrestler', () => {
    it('makes one entry per wrestler, its seasons newest first', () => {
        const wrestlers = groupByWrestler(records);
        expect(wrestlers.map((w) => [w.wrestler_name, w.wins, w.losses])).toEqual([
            ['Alison K', '32', '22'],
            ['Aiden S', '0', '1'],
        ]);
        expect(wrestlers[0].seasons.map((s) => s.season)).toEqual(['2023-2024', '2022-2023', '2021-2022']);
    });

    it('lists bouts outside any season last, as the off-season', () => {
        const wrestlers = groupByWrestler([
            row(3, 'Jacob B', null, 3, 1),
            row(3, 'Jacob B', '2021-2022', 11, 7),
            row(3, 'Jacob B', '2024-2025', 29, 12),
            row(3, 'Jacob B', 'Career', 43, 20),
        ]);
        expect(wrestlers[0].seasons.map((s) => s.season)).toEqual(['2024-2025', '2021-2022', 'Off-season']);
    });

    it('skips a wrestler with no career row', () => {
        expect(groupByWrestler([row(3, 'X', '2020-2021', 1, 0)])).toEqual([]);
        expect(groupByWrestler(undefined)).toEqual([]);
    });
});

describe('RecordsTable', () => {
    const renderTable = (props) =>
        render(
            <MemoryRouter>
                <RecordsTable wrestlers={groupByWrestler(records)} {...props} />
            </MemoryRouter>,
        );

    it('shows career rows only, with no Form column', () => {
        renderTable();
        expect(screen.getAllByRole('columnheader').map((h) => h.textContent)).toEqual(['', 'Name', 'W', 'L', 'Pins', 'Team Pts']);
        expect(screen.getByRole('link', { name: 'Alison K' })).toHaveAttribute('href', '/wrestlers/1');
        expect(screen.getByText('3 seasons')).toBeInTheDocument();
        expect(screen.getByText('1 season')).toBeInTheDocument();
        expect(screen.queryByText('2022-2023')).toBeNull();
    });

    it('opens a wrestler to their seasons, newest first, and closes again', () => {
        renderTable();
        const toggle = screen.getByRole('button', { name: "Alison K's record by season" });
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');

        const rows = screen.getAllByRole('row').map((r) => within(r).queryAllByRole('cell').map((c) => c.textContent));
        expect(rows.slice(1, 5)).toEqual([
            ['', 'Alison K3 seasons', '32', '22', '1', '12'],
            ['', '2023-2024', '14', '4', '1', '12'],
            ['', '2022-2023', '9', '11', '1', '12'],
            ['', '2021-2022', '9', '7', '1', '12'],
        ]);
        fireEvent.click(toggle);
        expect(screen.queryByText('2023-2024')).toBeNull();
    });

    it('opens from anywhere on the row, but not from the name link', () => {
        renderTable();
        fireEvent.click(screen.getByText('22'));
        expect(screen.getByText('2021-2022')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('link', { name: 'Aiden S' }));
        expect(screen.queryByText('2025-2026')).toBeNull();
    });

    it('starts with every wrestler open when asked', () => {
        renderTable({ expandAll: true });
        expect(screen.getByText('2021-2022')).toBeInTheDocument();
        expect(screen.getByText('2025-2026')).toBeInTheDocument();
    });
});
