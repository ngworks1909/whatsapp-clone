import React,{useContext, useEffect, useState} from 'react'
import '../css/Chats.css'
import Search from './Search'
import {doc, onSnapshot} from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';
import { UserContext } from '../context/UserContext';

export default function Chats() {
    

    const {currentUser} = useContext(AuthContext);
    const {active} = useContext(ChatContext);
    const {setActive} = useContext(UserContext);


    const [chats, setChats] = useState([]);
    const {dispatch} = useContext(ChatContext);

    useEffect(()=>{

        const getChats=()=>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () =>{
                unsub();
            }
        }  
        currentUser.uid && getChats();
        

    },[currentUser.uid]);

    const handleSelect = (u) =>{
        dispatch({type: "CHANGE_USER", payload: u});
        if(!active){
          setActive(true);
        }
    }


    
  return (
    <>
      <Search/>
      <div className="chat-list" >
          {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) =>(
            <div className="sub-total display-flex align-center" key={chat[0]}>
                 <input type="image" className='chat-image' src={chat[1].userInfo.photoURL} alt="" />
              <div className="chat display-flex align-center"  onClick={()=>handleSelect(chat[1].userInfo)} >
              <div className="chat-info display-flex flex-column">
                  <span className='chat-username'>{chat[1].userInfo.displayName}</span>
                  <span className='chat-message'>{chat[1].lastMessage?.text}</span>
              </div>
          </div>
            </div>
              
        ))} 
      </div>
    </>
  )
}
