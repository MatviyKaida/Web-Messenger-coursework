import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
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
        try {

        }
        catch (err) {
            console.log(`Signup error: ${err}`);
        }
    }
}))