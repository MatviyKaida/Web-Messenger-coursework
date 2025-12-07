import { useAuthStore } from "../store/UseAuthStore.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/UseChatStore.js";

const Navbar = () => {
  const { createChat } = useChatStore();
  const { logout, authUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState("");

  const handleCreateChat = async () => {
    const username = searchValue.trim();

    if (!username) return;

    if (username === authUser?.username) {
      toast.error("You cannot create chat with yourself");
      return;
    }

    await createChat(username);
    setSearchValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleCreateChat();
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* LOGO */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Messanger</h1>
            </Link>
          </div>

          {/* SEARCH */}
          {authUser && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for user..."
                  className="w-full px-3 py-2 rounded-xl border-2 border-transparent focus:border-[#5e69cb] focus:ring-0 focus:outline-none bg-gray-800 text-white"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button
                  onClick={handleCreateChat}
                  className="absolute right-1 top-1/2 -translate-y-1/2 
                  flex items-center justify-center size-8 rounded-lg bg-primary/10 
                  hover:opacity-80 transition-all"
                >
                  <Search className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex items-center gap-3">

            {/* Settings */}
            <Link
              to="/settings"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all px-3 py-1.5 rounded-xl"
            >
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 hover:opacity-80 transition-all px-3 py-1.5 rounded-xl"
                >
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Profile</span>
                </Link>

                {/* Logout */}
                <button
                  className="flex items-center gap-2.5 hover:opacity-80 transition-all px-3 py-1.5 rounded-xl"
                  onClick={logout}
                >
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-primary" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
