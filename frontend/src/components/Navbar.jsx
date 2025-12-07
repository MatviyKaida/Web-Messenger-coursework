import { useAuthStore } from "../store/UseAuthStore.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/UseChatStore.js";

const Navbar = () => {
  const {createChat} = useChatStore();
  const {logout, authUser} = useAuthStore();
  const [searchValue, setSearchValue] = useState("");

  const handleCreateChat = async () => {
    const username = searchValue.trim()

    if(!username) {
      return;
    }
    if (username === authUser?.username) {
      toast.error("You cannot create chat with yourself");
      return;
    }

    await createChat(username);
    setSearchValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreateChat();
    }
  };
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Messanger</h1>
            </Link>
          </div>
          {authUser && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search username..."
                  className="input input-sm pr-10"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 btn btn-sm"
                  onClick={handleCreateChat}
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar