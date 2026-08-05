import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile, checkAuth } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || "");
      setBio(authUser.bio || "");
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { fullName: name, bio };

    if (selectedImg) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        const result = await updateProfile({
          ...payload,
          profilePic: reader.result,
        });
        if (result) {
          await checkAuth();
          navigate("/");
        }
      };
      return;
    }

    const result = await updateProfile(payload);
    if (result) {
      await checkAuth();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-2xl font-semibold text-white uppercase underline">
            Profile details
          </h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="file"
              onChange={(e) => setSelectedImg(e.target.files[0])}
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.avatar_icon
              }
              alt=""
              className={`w-16 h-16 ${selectedImg && " rounded-lg"} shadow-[0_0_20px_rgba(34,211,238,0.25)] border-[1.7px] rounded-full border-black`}
            />
            <div class="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-sky-500/30 bg-slate-950/60 px-6 py-3 font-sans font-medium text-sky-200 transition-all duration-300 hover:border-sky-400 hover:text-sky-100 hover:shadow-[0_0_20px_rgba(56,189,248,0.45)] focus:outline-none focus:ring-2 focus:ring-sky-400/50 backdrop-blur-md">
              <span class="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/0 via-sky-400/10 to-sky-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <svg
                class="h-5 w-5 stroke-sky-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:stroke-sky-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>

              <span class="tracking-wide drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                Upload Photo
              </span>
            </div>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-white rounded-2xl cursor-pointer font-semibold shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
          >
            Save
          </button>
        </form>
        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover"
          src={authUser?.profilePic || assets.avatar_icon}
          alt="profile"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
