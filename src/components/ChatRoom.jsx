import React,{useContext, useEffect, useState} from 'react'
import '../css/ChatRoom.css'
import { HiDotsVertical } from "react-icons/hi";
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input';
import { UserContext } from '../context/UserContext';
import logo from '../assets/logo.png'
import { RiArrowLeftDoubleFill } from "react-icons/ri";

export default function ChatRoom() {
  const {data} = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  const {active} = useContext(UserContext);
  const {setActive} = useContext(UserContext);
  



  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    })

    return ()=>{
      unsub();
    }
  },[data.chatId])
  return (
    <> 
        {active && <div className="chatroom">
                    {/* chat header */}
            <div className="chat-header display-flex">
                <div className="chat-head display-flex align-center">
                   <button className='bg-transparent back-button' onClick={()=>{setActive(false)}}><RiArrowLeftDoubleFill className='back-arrow'/></button>
                    <input type="image" src={data.user?.photoURL} alt={""} className='chat-room-image' />
                    <span className='color-white'>{data.user?.displayName}</span>
                </div>
                <button className='menu-button'><HiDotsVertical className='menu'/></button>
            </div>

                    {/* chat main */}
            <div className="messages display-flex flex-column">
               {messages.map((m)=>(
                  <Message message={m} key={m.id} />
               ))}  
            </div>
            <Input/>
       </div> 
      }
    
       {!active && <div className="chatroom display-flex flex-column gap-10 align-center justify-center">
             {/* <IoLogoWhatsapp className='chatroom-logo'/> */}
             <img src={logo} alt="" className='chatroom-logo'/>
             <h4 className='color-white'>Choose to start a chat...</h4>
       </div>
       }
    </>
  )
}
