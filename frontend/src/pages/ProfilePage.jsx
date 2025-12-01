import { useState, useEffect } from "react";
import { useAuthStore } from "../store/UseAuthStore.js";
import { Camera, Mail, User, Clock8 } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setFirstName(authUser?.firstName ?? "");
    setLastName(authUser?.lastName ?? "");
    setBio(authUser?.bio ?? "");
  }, [authUser]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
    };
  };

  const handleSave = async () => {
    const updateData = {
      firstName,
      lastName,
      bio,
    };
    if (selectedImg !== "") {
      updateData.profilePicURL = selectedImg;
    }
    await updateProfile(updateData);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "./avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-6">


            {/* First Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400">First Name</div>
              <input
                type="text"
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full focus:outline-none"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400">Last Name</div>
              <input
                type="text"
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full focus:outline-none"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400">Bio</div>
              <textarea
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full h-24 resize-none focus:outline-none"
                placeholder="Write something about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isUpdatingProfile}
              />
            </div>

          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={isUpdatingProfile}
            className="w-full py-3 bg-[#5f66cc] hover:bg-[#555cbc] transition rounded-lg text-white font-semibold disabled:opacity-50"
          >
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </button>

          {/* Account info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <div className="flex items-center justify-between gap-1">
                  <User className="h-5 w-5"/>
                  <span>Username</span>
                </div>
                <span>{authUser?.username}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <div className="flex items-center justify-between gap-1">
                  <Mail className="h-5 w-5"/>
                  <span>Email</span>
                </div>
                <span>{authUser?.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <div className="flex items-center justify-between gap-1">
                  <Clock8 className="h-5 w-5"/>
                  <span>Member Since</span>
                </div>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
