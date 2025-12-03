import { X } from "lucide-react";
import { useAuthStore } from "../store/UseAuthStore.js";
import { useChatStore } from "../store/UseChatStore.js";

const ChatHeader = () => {
  const { selectedChat, setSelectedChat } = useChatStore();
  const { authUser } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={(selectedChat.user1ID._id === authUser._id 
                ? selectedChat.user2ID.userProfileID.profilePicUrl 
                : selectedChat.user1ID.userProfileID.profilePicUrl
                ) || "/avatar.png"} alt={(selectedChat.user1ID._id === authUser._id 
                ? selectedChat.user2ID.userProfileID.firstName + " " + selectedChat.user2ID.userProfileID.lastName
                : selectedChat.user1ID.userProfileID.firstName + " " + selectedChat.user1ID.userProfileID.lastName
                )} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{(selectedChat.user1ID._id === authUser._id 
                ? selectedChat.user2ID.userProfileID.firstName + " " + selectedChat.user2ID.userProfileID.lastName
                : selectedChat.user1ID.userProfileID.firstName + " " + selectedChat.user1ID.userProfileID.lastName
                )}</h3>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedChat(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;