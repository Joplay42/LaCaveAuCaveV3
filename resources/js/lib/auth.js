import axios from "axios";

const TOKEN_KEY = "auth_token";
const USER_NAME_KEY = "auth_name";

export function getToken() {
    return localStorage.getItem(TOKEN_KEY) || null;
}

export function getUserName() {
    return localStorage.getItem(USER_NAME_KEY) || null;
}

export function isAuthenticated() {
    return !!getToken();
}

function extractPayload(data) {
    // API returns array: [ { token, name }, message ] or object
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
            if (payload.name) localStorage.setItem(USER_NAME_KEY, payload.name);
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
            if (payload.name) localStorage.setItem(USER_NAME_KEY, payload.name);
        }
        return { ok: true, payload };
    } catch (err) {
        const message = err.response?.data?.message || "Échec connexion";
        return { ok: false, error: message, details: err.response?.data };
    }
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
}

export function getStatus() {
    return {
        authenticated: isAuthenticated(),
        token: getToken(),
        name: getUserName(),
    };
}
