import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useChatStore = create((set) => ({
    messages: [],
    chats: [],
    selectedChat: null,
    areChatsLoading: false,
    areMessagesLoading: false,
    getChats: async () => {
        set({areChatsLoading: true});
        try {
            const res = await axiosInstance.get("/chats/getChatList");
            set({chats: res.data.chats});
            console.log(res.data.chats);
        }
        catch (err) {
            console.log(`Getting chats failed: ${err}`);
            toast.error(err.response.data.message);
        }
        finally {
            set({areChatsLoading: false});
        }
    },
    getMessages: async (chatID) => {
        set({areMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/chats/messages/${chatID}/getMessages`);
            set({messages: res.data});
        }
        catch(err) {
            console.log(`Get mesages error: ${err}`);
            toast.error(err.response.data.message);
        }
        finally {
            set({areMessagesLoading: false});
        }
    },
    setSelectedChat: (selectedChat) => set({selectedChat})
}))
