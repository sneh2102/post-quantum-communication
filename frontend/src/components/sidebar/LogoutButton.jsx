import React from 'react'
import { IoExitOutline } from 'react-icons/io5';
import { useAuth } from '../../hooks/useAuth';

export const LogoutButton = () => {
  const {logoutHandler} = useAuth();
  const handleLogout = async () => {
    console.log("Logout button clicked");
    await logoutHandler();
  }
  return (
    <div className='mt-auto w-6 h-6 text-white cursor-pointer' onClick={handleLogout}><IoExitOutline/></div>
  )
}
