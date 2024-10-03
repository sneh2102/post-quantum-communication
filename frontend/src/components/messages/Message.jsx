import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTime'

export const Message = ({message}) => {
  const {auth} = useContext(AuthContext)
  const {selectedConversations}=useConversation()
  const fromMe = message.senderId === auth.id
  const chatClass = fromMe ? 'chat chat-end' : 'chat chat-start'
  const profileImage = fromMe ? auth.profilePicture : selectedConversations.profilePicture
  const bubbleColor = fromMe ? 'bg-blue-500' : 'bg-gray-500'
  const formatedTime = extractTime(message.createdAt)
  useEffect(() => {
    console.log(message.senderId," ",auth)
  }, [message]) 
  
  return (
    <div className={`${chatClass}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src={`${profileImage}`}></img>
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleColor}`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-200'>{formatedTime}</div>
    </div>
  )
}
