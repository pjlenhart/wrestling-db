/**
 * A local copy of the roster.
 *
 * The wrestler picklist comes from the API, but scoring happens in a gym where
 * the network often does not. Caching the last roster that loaded means a dual
 * can still be scored from the picklist with no connection at all -- and the
 * name field stays typeable either way, so an unknown or unreachable roster is
 * never a dead end.
 */

const ROSTER_KEY = 'wrestlingdb.rosterCache.v1';

export function readCachedRoster() {
    try {
        const raw = window.localStorage.getItem(ROSTER_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed.roster) ? parsed.roster : [];
    } catch (err) {
        return [];
    }
}

export function writeCachedRoster(roster) {
    try {
        window.localStorage.setItem(
            ROSTER_KEY,
            JSON.stringify({ cachedAt: new Date().toISOString(), roster }),
        );
    } catch (err) {
        // A roster that will not cache is a slower next visit, nothing worse.
    }
}
