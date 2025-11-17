import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext,
} from "react";
import axios from "axios";

const AuthContext = createContext({
    user: null,
    token: null,
    loading: true,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    updateUser: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            // Try new format first
            const stored = localStorage.getItem("auth");
            if (stored) {
                const { user: storedUser, token: storedToken } =
                    JSON.parse(stored);
                setUser(storedUser ?? null);
                setToken(storedToken ?? null);
                return;
            }
            // Fallback to legacy format
            const legacyUserRaw = localStorage.getItem("auth_user");
            const legacyToken = localStorage.getItem("auth_token");
            if (legacyUserRaw && legacyToken) {
                let legacyUser = null;
                try {
                    legacyUser = JSON.parse(legacyUserRaw);
                } catch {}
                setUser(legacyUser ?? null);
                setToken(legacyToken);
            }
        } catch (e) {
            console.warn("Failed to parse auth from localStorage", e);
        } finally {
            setLoading(false);
        }
    }, []);

    // Sync axios Authorization header with token state
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const persist = useCallback((nextUser, nextToken) => {
        try {
            localStorage.setItem(
                "auth",
                JSON.stringify({ user: nextUser, token: nextToken })
            );
        } catch (e) {
            console.warn("Failed to persist auth to localStorage", e);
        }
    }, []);

    const login = useCallback(
        ({ user: newUser, token: newToken }) => {
            setUser(newUser);
            setToken(newToken);
            persist(newUser, newToken);
        },
        [persist]
    );

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        try {
            localStorage.removeItem("auth");
        } catch (e) {
            console.warn("Failed to remove auth from localStorage", e);
        }
    }, []);

    const updateUser = useCallback(
        (nextUser) => {
            setUser(nextUser);
            persist(nextUser, token);
        },
        [persist, token]
    );

    const value = useMemo(
        () => ({
            user,
            token,
            loading,
            isAuthenticated: !!token,
            login,
            logout,
            updateUser,
        }),
        [user, token, loading, login, logout, updateUser]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
