import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const BASE_URL = `http://localhost:5000`

export const useAuthStore = create(
    persist (
        (set, get) => ({
            authUser: null,
            isSigningUp: false,
            isLoggingIn: false,
            isUpdatingProfile: false,
            isCheckingAuth: true,
            socket: null,
            checkAuth: async() => { 
                try{
                    const res = await axiosInstance.get("/auth/check");
                    set({authUser:res.data});
                    get().connectSocket();
                }
                catch (err) {
                    set({authUser: null});
                    console.log(`Error in checkAuth ${err}`);
                }
                finally {
                    set({isCheckingAuth:false});
                }
            },
            signup: async (data) => {
                set({isSigningUp: true});
                try {
                    const res = await axiosInstance.post("/auth/signup", data);
                    await get().checkAuth();
                    set({authUser: res.data});
                    toast.success("Account created Successfully");
                    get().connectSocket();
                }
                catch (err) {
                    toast.error(err.response.data.message);
                    console.log(`Signup error: ${err}`);
                }
                finally {
                    set({isSigningUp: false});
                }
            },
            login: async (data) => {
                set({isLoggingIn: true});
                try {
                    const res = await axiosInstance.post("/auth/login", data);
                    await get().checkAuth();
                    set({authUser: res.data});
                    toast.success("Logged in successfully");
                    get().connectSocket()
                }
                catch (err) {
                    toast.error(err.response.data.message);
                    console.log(`Login error: ${err}`);
                }
                finally {
                    set({isLoggingIn: false});
                }
            },
            fetchUserProfile: async () => {
                const { authUser } = get();
                if (!authUser) return;
                try {
                    const res = await axiosInstance.get(`/profile/getUserProfile/${authUser._id}`);
                    set({ authUser: { ...authUser, profilePic: res.data.profilePicUrl } });
                } catch (err) {
                    console.log(`Fetching user profile error: ${err}`);
                }
            },
            logout: async () => {
                try {
                    await axiosInstance.post("/auth/logout");
                    set({authUser: null});
                    toast.success("Logged out successfully");
                    get().disconnectSocket();
                }
                catch (err) {
                    console.log(`Logout error: ${err}`);
                    toast.error(err.response.data.message);
                }
            },
            updateProfile: async (data) => {
                set({isUpdatingProfile: true}); 
                try {
                    const res = await axiosInstance.post("/profile/updateProfile", data);
                    set({authUser: res.data});
                    toast.success("Profile updated successfully");
                }
                catch (err) {
                    console.log(`Update profile error: ${err}`);
                    toast.error("Failed to update profile");
                }
                finally {
                    set({isUpdatingProfile: false});
                }
            },
            connectSocket: () => {
                const {authUser} = get();
                if(!authUser || get().socket?.connected) 
                    return;
                const socket = io(BASE_URL);
                socket.connect();
                set({socket: socket});
            },
            disconnectSocket: () => {
                if(get().socket?.connected) get().socket.disconnect();
            }
    }),
    {
        name: "auth-storage",
        partialize: (state) => ({
        authUser: state.authUser,
        isSigningUp: state.isSigningUp,
        isLoggingIn: state.isLoggingIn,
        isUpdatingProfile: state.isUpdatingProfile,
        isCheckingAuth: state.isCheckingAuth,
      }),
    })

)