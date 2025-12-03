import React, { useEffect } from 'react'
import { useChatStore } from '../store/UseChatStore'

const Sidebar = () => {
    const { getChats, chats, selectedChat, setSelectedChat, areChatsLoading } = useChatStore();
    useEffect(() => {
        getChats()
    }, [chats]);
    if(areChatsLoading) {
        return <SidebarSkeleton />
    }
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar