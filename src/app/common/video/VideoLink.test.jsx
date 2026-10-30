import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BoutVideoLink, DualPlaylistLink } from './VideoLink';

jest.mock('./matchVideos.json', () => ({
    bouts: { 10: ['oneVideo'], 11: ['partOne', 'partTwo'] },
    duals: { 5: 'PLdual' },
}));

describe('BoutVideoLink', () => {
    it('links a bout to its video in a new tab', () => {
        render(<BoutVideoLink matchId={10} label="Ryan against L. Smith" />);
        const link = screen.getByRole('link', { name: 'Watch Ryan against L. Smith on YouTube' });
        expect(link).toHaveAttribute('href', 'https://www.youtube.com/watch?v=oneVideo');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('offers each part of a bout filmed in parts', () => {
        render(<BoutVideoLink matchId={11} label="Nick against A. Finch" />);
        fireEvent.click(screen.getByRole('button', { name: /2 parts/ }));
        const parts = screen.getAllByRole('menuitem');
        expect(parts.map((p) => p.textContent)).toEqual(['Part 1', 'Part 2']);
        expect(parts[1]).toHaveAttribute('href', 'https://www.youtube.com/watch?v=partTwo');
    });

    it('shows a dash for a bout that was not filmed', () => {
        const { container } = render(<BoutVideoLink matchId={99} label="x" />);
        expect(screen.queryByRole('link')).toBeNull();
        expect(container.textContent).toBe('—');
    });
});

describe('DualPlaylistLink', () => {
    it('links a dual to its playlist', () => {
        render(<DualPlaylistLink teamMatchId={5} opponent="Dulaney" />);
        expect(screen.getByRole('link', { name: 'Watch the dual against Dulaney on YouTube' })).toHaveAttribute(
            'href',
            'https://www.youtube.com/playlist?list=PLdual',
        );
    });

    it('shows a dash for a dual with no playlist', () => {
        render(<DualPlaylistLink teamMatchId={6} opponent="Severn (JV)" />);
        expect(screen.queryByRole('link')).toBeNull();
    });
});
