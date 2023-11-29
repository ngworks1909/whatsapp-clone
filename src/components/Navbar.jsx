import React, { useContext} from 'react'
import '../css/Navbar.css'
import { HiDotsVertical } from "react-icons/hi";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import {BiLogOut} from 'react-icons/bi'


export default function Navbar() {
  const {currentUser} = useContext(AuthContext);
  return (
    <>
     <div className="nav-bar display-flex align-center">
       <div className="nav-left display-flex gap-10 align-center">
        <input type="image" className='user-image' src={currentUser.photoURL} alt="" />
        <span className="nav-text">{currentUser.displayName}</span>                               
       </div>
        <div className='menu-button'><HiDotsVertical className='menu'/>
             <div className="sub-menu">
                 <button className='signout display-flex align-center'onClick={()=>signOut(auth)}><BiLogOut className='signout-icon color-white'/><span className='color-white'>Logout</span></button>
             </div>
        </div>
        {/* <button className='signout'>Logout</button> */}
     </div>
      
    </>
  )
}
