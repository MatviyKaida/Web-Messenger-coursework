import React, { useEffect } from 'react'
import { useChatStore } from '../store/UseChatStore.js';
import { useAuthStore } from '../store/UseAuthStore.js';
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";

const Sidebar = () => {
    const getChats = useChatStore(state => state.getChats);
    const chats = useChatStore(state => state.chats);
    const selectedChat = useChatStore(state => state.selectedChat);
    const setSelectedChat = useChatStore(state => state.setSelectedChat);
    const areChatsLoading = useChatStore(state => state.areChatsLoading);
    const {authUser} = useAuthStore();
    useEffect(() => {
        getChats()
    }, []);
    if(areChatsLoading) {
        return <SidebarSkeleton />
    }
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className="size-6" />
                <span className="font-medium hidden lg:block">Chats</span>
            </div>
        </div>

      <div className="overflow-y-auto w-full py-3">
        {chats.map((chat) => (
          <button
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedChat?._id === chat._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={(authUser._id !== chat.user1ID._id 
                  ? chat.user1ID?.userProfileID?.profilePicUrl 
                  : chat.user2ID?.userProfileID?.profilePicUrl
                ) || "/avatar.png"}
                className="size-12 object-cover rounded-full"
              />
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{authUser._id !== chat.user1ID._id ? chat.user1ID.userProfileID.firstName + " " + chat.user1ID.userProfileID.lastName : chat.user2ID.userProfileID.firstName + " " + chat.user2ID.userProfileID.lastName }</div>
              <div className="text-sm text-zinc-400">
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar