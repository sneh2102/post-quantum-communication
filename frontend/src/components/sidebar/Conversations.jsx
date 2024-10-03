import React from 'react'
import { Converstion } from './Converstion'
import useConversations from '../../hooks/useConversations'

export const Conversations = () => {
  const {loading, conversations} = useConversations()
  return (
    <div className='flex flex-col'>

      {
        conversations.map((conversation) => {
          return <Converstion key={conversation._id} conversation={conversation}/>
        })
      }
      {
        loading? <span className="loading loading-spinner mx-auto"></span>:null
      }
    </div>
  )
}
