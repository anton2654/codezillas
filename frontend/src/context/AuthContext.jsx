import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/api/user/profile/");
            setUser(response.data);
            console.log("Profile fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const login = async (credentials) => {
        try {
            await axiosInstance.post("/api/user/login/", credentials);
            console.log("Login successful, attempting to fetch profile...");
            await fetchProfile();
        } catch (error) {
            console.error("Login error:", error);
            throw error.response?.data || error.message || "Login failed";
        }
    };

    const register = async (userInfo) => {
        try {
            await axiosInstance.post("/api/user/register/", userInfo);
            console.log("Registration successful, attempting to fetch profile...");
            await fetchProfile();
        } catch (error) {
            console.error("Register error:", error.response?.data || "Registration failed");
            if (typeof error.response?.data === "object") {
                throw error.response.data;
            } else {
                throw error.response?.data?.message || error.response?.data || "Registration failed";
            }
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/api/user/logout/");
            setUser(null);
            console.log("Logout successful.");
        } catch (error) {
            console.error("Logout error:", error);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
