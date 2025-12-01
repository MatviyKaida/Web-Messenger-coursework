import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create(
    persist (
        (set) => ({
            authUser: null,
            isSigningUp: false,
            isLoggingIn: false,
            isUpdatingProfile: false,
            isCheckingAuth: true,
            checkAuth: async() => { 
                try{
                    const res = await axiosInstance.get("/auth/check");
                    set({authUser:res.data});
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
                    set({authUser: res.data});
                    toast.success("Account created Successfully");
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
                    set({authUser: res.data});
                    toast.success("Logged in successfully");
                }
                catch (err) {
                    toast.error(err.response.data.message);
                    console.log(`Login error: ${err}`);
                }
                finally {
                    set({isLoggingIn: false});
                }
            },
            logout: async () => {
                try {
                    await axiosInstance.post("/auth/logout");
                    set({authUser: null});
                    toast.success("Logged out successfully");
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
            }
    }),
    {
        name: "auth-storage"
    })

)