import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

export const Converstion = ({
  conversation
}) => {

  const {selectedConversations,setSelectedConversations} = useConversation();
  const isSelected = selectedConversations?._id === conversation._id;
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  return (
    <>
      <div className={`flex gap-2 items-center cursor-pointer hover:bg-primary ${isSelected? "bg-primary": ""}`} onClick={()=>{setSelectedConversations(conversation)}}>
        {/* Avatar */}
        <div className={`avatar ${isOnline? "online": ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePicture} alt="user-avatar"/>
          </div>
        </div>

        <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">{conversation.username}</p>
                <span className="text-xl"></span>
            </div>
        </div>
        
        <div className="divider px-3"></div>
      </div>
    </>
  );
};
