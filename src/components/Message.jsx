import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/Message.css'
import { AuthContext } from '../context/AuthContext'

export default function Message({message}) {

  const {currentUser} = useContext(AuthContext);
  const [type,setType] = useState();

  useEffect(()=>{
    message.senderId === currentUser.uid ? setType("outgoing"):setType("incoming");
  },[message.senderId,currentUser.uid]);


  
  const ref = useRef();
  useEffect(()=>{
      ref.current?.scrollIntoView({behavior : "smooth"})
  },[message]);


  

  return (
    <>
      <div ref={ref} className={`message ${type==='incoming'?'opponent':'owner'} display-flex`} >
            <div className={`messageContent ${type} color-white flex-column display-flex`} style={type==='incoming'?{borderRadius: '0px 10px 10px 10px'}:{borderRadius: '10px 0px 10px 10px'}}>
                <span className='message-item'>{message.text}</span>
                <div className="message-timeline display-flex">
                    <span className='message-time'>{`${message.date.toDate().getHours() % 12 || 12}:${('0' + message.date.toDate().getMinutes()).slice(-2)} ${message.date.toDate().getHours() < 12 ? 'am' : 'pm'}`}</span>
                </div>
            </div>
        </div>
    </>
  )
}
