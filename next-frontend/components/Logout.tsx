'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
  return (
    <button onClick={() => signOut()} className='text-blue-400 text-xl'>Log out</button>
  )
}

export default Logout