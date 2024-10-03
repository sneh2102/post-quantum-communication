import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';

const useListenMessage = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages}= useConversation()
  useEffect(() => {
    if(socket){
      socket.on('newMessage', (data) => {
        setMessages([...messages,data])
      })
    }

    return () => {
      if(socket){
        socket.off('newMessage')
        }
    }
  }, [socket,setMessages,messages])
}

export default useListenMessage
