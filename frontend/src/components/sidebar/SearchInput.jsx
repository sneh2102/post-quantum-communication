import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useConversations  from '../../hooks/useConversations'
import toast from 'react-hot-toast';

export const SearchInput = () => {
  const [search, setSearch] = React.useState('')
  const {setSelectedConversations} = useConversation()
  const {conversations} = useConversations()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(search === '') {
      return
    } 
    
    const conversation = conversations.find((conversation) => conversation.username.toLowerCase().includes(search.toLowerCase())) 
    if(conversation) {
      setSelectedConversations(conversation)
    } else {
      toast.error('No conversation found')
    }
  }
  return (
    <form className='flex justify-between' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search....' className='input input-bordered rounded-3xl w-full' 
        value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle btn-primary'><IoSearchSharp/></button>
    </form>
  )
}
