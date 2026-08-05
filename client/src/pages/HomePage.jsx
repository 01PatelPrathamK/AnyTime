import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full min-h-screen px-3 py-4 sm:px-[8%] sm:py-[3%]">
      <div
        className={`overflow-hidden h-[100%] min-h-[calc(100vh-2rem)] rounded-[28px] border border-white/20 bg-slate-950/35 shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl grid grid-cols-1 relative ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
