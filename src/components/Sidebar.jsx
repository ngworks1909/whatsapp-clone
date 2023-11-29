import React from 'react'
import '../css/Sidebar.css'
import Navbar from './Navbar'
import Chats from './Chats'

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Navbar/>
        <Chats/>
      </div>
      
    </>
  )
}
