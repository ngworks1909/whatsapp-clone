import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatRoom from '../components/ChatRoom'
import '../css/Home.css'
import { UserContext } from '../context/UserContext';


export default function Home() {
  const [screen,setScreen] = useState(window.innerWidth);
  window.addEventListener('resize', ()=>{
    setScreen(window.innerWidth);
  });


 
  
  const {active} = useContext(UserContext);
  return (
    <>
      <div className="home display-flex align-center justify-center">
         <div className="container-1 display-flex">
            {active && screen < 998 && <ChatRoom/>}
            {!active && screen < 998 && <Sidebar/>}
            {screen >= 998 && <>
              <Sidebar/>
              <ChatRoom/>
              </>}

         </div>
      </div>
      
    </>
  )
}
