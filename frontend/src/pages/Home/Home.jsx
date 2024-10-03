import React from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { MessageContainer } from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='w-full flex justify-start min-h-screen'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home