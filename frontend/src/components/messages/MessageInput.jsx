import React from 'react'
import { IoSend } from 'react-icons/io5';
import {useMessages} from '../../hooks/useMessages'
export const MessageInput = () => {

  const[message, setMessage] = React.useState('')
  const {send, loading} = useMessages()
  const handleSubmit = async (e) => { 
    e.preventDefault()
    if(message === '') {
      return
    }
    await send(message)
    setMessage('')
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        {/* Input Field */}
        <input
          type="text"
          className='border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-800 rounded-btn border-gray-700 text-white'
          placeholder='Send a Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* Send Button */}
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
        >
         {loading?<div className="loading loading-spinner"></div> : <IoSend size={20} />}
        </button>
      </div>
    </form>
  )
}
