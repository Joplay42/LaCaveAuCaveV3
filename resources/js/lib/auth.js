import axios from "axios";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function getToken() {
    return localStorage.getItem(TOKEN_KEY) || null;
}

export function getUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function getUserName() {
    const user = getUser();
    return user?.name || null;
}

export function isAuthenticated() {
    return !!getToken();
}

function extractPayload(data) {
    // API returns array: [ { token, name, ... }, message ] or object
    if (Array.isArray(data)) {
        const candidate =
            data.find((d) => d && typeof d === "object" && "token" in d) ||
            data[0];
        return candidate || {};
    }
    return data || {};
}

export async function register({ name, email, password, c_password }) {
    try {
        const res = await axios.post("/api/register", {
            name,
            email,
            password,
            c_password,
        });
        const payload = extractPayload(res.data);
        if (payload.token) {
            localStorage.setItem(TOKEN_KEY, payload.token);
            localStorage.setItem(USER_KEY, JSON.stringify(payload));
        }
        return { ok: true, payload };
    } catch (err) {
        const message = err.response?.data?.message || "Erreur inscription";
        return { ok: false, error: message, details: err.response?.data };
    }
}

export async function login({ email, password }) {
    try {
        const res = await axios.post("/api/login", { email, password });
        const payload = extractPayload(res.data);
        if (payload.token) {
            localStorage.setItem(TOKEN_KEY, payload.token);
            localStorage.setItem(USER_KEY, JSON.stringify(payload));
        }
        return { ok: true, payload };
    } catch (err) {
        const message = err.response?.data?.message || "Échec connexion";
        return { ok: false, error: message, details: err.response?.data };
    }
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function getStatus() {
    return {
        authenticated: isAuthenticated(),
        token: getToken(),
        user: getUser(),
        name: getUserName(),
    };
}
