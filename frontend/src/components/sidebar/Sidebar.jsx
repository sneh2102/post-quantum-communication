import React, { useEffect } from 'react'
import { Conversations } from './Conversations'
import { SearchInput } from './SearchInput'
import { LogoutButton } from './LogoutButton'
import useConversations from '../../hooks/useConversations'

export const Sidebar = () => {
  const {loading, conversations} = useConversations()
  console.log("Conversations:- ",conversations)
  useEffect(() => {
  }, [])
  
  return (
    <div  className='border-r border-slate-500 p-4 flex flex-col bg-gray-700 min-w-[350px]'>
        <SearchInput/>
        <div className="divider px-3"></div>
        <Conversations/>
        <LogoutButton/>
    </div>
  )
}
