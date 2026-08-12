/**
 * Signing in to score.
 *
 * Kept separate from the site's existing `authService`, which posts to a djoser
 * endpoint served by Django -- and Django is not deployed anywhere, so that
 * path could never work in production. This talks to the node API, which is
 * what actually serves the site.
 */

import jwtDecode from 'jwt-decode';
import http from '../../services/httpService';

const STORAGE_KEY = 'wrestlingdb.scoresheetAuth.v1';
const apiEndpoint = '/wrestling-api/auth';

function read() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (err) {
        return null;
    }
}

function write(session) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (err) {
        // A session that will not persist still works for this page load.
        console.error('Session could not be saved:', err);
    }
}

export function logout() {
    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        /* nothing useful to do */
    }
}

/**
 * The stored session, or null if it has expired.
 *
 * Expiry is checked here rather than waiting for the server to reject a write.
 * Showing somebody a full scoring screen and only failing when they press
 * Finish -- after a whole dual -- would be the worst possible time to find out.
 */
export function getSession() {
    const session = read();
    if (!session || !session.token) return null;

    try {
        const { exp } = jwtDecode(session.token);
        if (exp && exp * 1000 <= Date.now()) {
            logout();
            return null;
        }
    } catch (err) {
        logout();
        return null;
    }

    return session;
}

export function getToken() {
    const session = getSession();
    return session ? session.token : null;
}

export function getCurrentUser() {
    const session = getSession();
    return session ? session.user : null;
}

/** Only staff may write; everyone can read. */
export function canEdit() {
    const user = getCurrentUser();
    return Boolean(user && user.isStaff);
}

/** Spread into a request's headers. Empty when signed out, which reads as public. */
export function authHeader() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(username, password) {
    const { data } = await http.post(`${apiEndpoint}/login`, { username, password });
    write({ token: data.token, user: data.user });
    return data.user;
}

const scoresheetAuth = {
    login,
    logout,
    getSession,
    getToken,
    getCurrentUser,
    canEdit,
    authHeader,
};

export default scoresheetAuth;
