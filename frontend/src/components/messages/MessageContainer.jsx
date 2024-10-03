import React, { useRef, useEffect } from 'react';
import { Messages } from './Messages';
import { MessageInput } from './MessageInput';
import { IoChatboxOutline } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';

export const MessageContainer = () => {
  const {selectedConversations, setSelectedConversations}=useConversation();
  useEffect(() => { 
    return () => {
      setSelectedConversations(null)
    }
  }, [setSelectedConversations])
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className='md:min-w-[450px] w-full flex flex-col h-screen'>
      {!selectedConversations ? <NochatSelected /> : <>
        <div className="bg-slate-500 px-4 py-2 mb-2">
        <span className="label-text">To:</span>{" "}
        <span className="text-white">{selectedConversations.username}</span>
      </div>

      {/* Messages container */}
      <div className='flex-1 overflow-auto px-4'>
        <Messages />
        {/* Reference to the last message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input stays at the bottom */}
      <div className='sticky bottom-0'>
        <MessageInput />
      </div>
      </>}
    </div>
  );
};

const NochatSelected = () => {
    return (
        <div className='flex-1 flex items-center justify-center flex-col'>
            <IoChatboxOutline className='text-white text-3xl'/>
        <p className='text-white'>Select a chat to start messaging</p>
        </div>
    );
    };
