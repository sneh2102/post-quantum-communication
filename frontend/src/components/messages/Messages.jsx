import React, { useEffect, useRef } from 'react'
import { Message } from './Message'
import { useGetMessages} from '../../hooks/useGetMessages'
import  useListenMessage from '../../hooks/useListenMessage'

export const Messages = () => {
  const {loading, messages} = useGetMessages()
  const messagesEndRef = useRef(null);
  useListenMessage()
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100)
  }, [messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading ? <div className="loading loading-spinner"></div> : messages.map((message) => (
        <div key={message._id}
        ref={messagesEndRef} 
        ><Message message={message} /></div>
      ))}
    </div>
  )
}
