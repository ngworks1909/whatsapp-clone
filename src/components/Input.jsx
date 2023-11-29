import React, { useContext, useState } from 'react'
import '../css/Input.css'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { updateDoc,doc, arrayUnion, Timestamp, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';


export default function Input() {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const [text, setText] = useState("");

    const handleSend = async() => {
         await updateDoc(doc(db,"chats",data.chatId),{
             messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
             })
         });

         await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId + ".lastMessage"] : {text},
            [data.chatId + ".date"] : serverTimestamp(),

         });

         await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId + ".lastMessage"] : {text},
            [data.chatId + ".date"] : serverTimestamp(),

         })
         setText("");

    }

  return (
    <>
        <div className="chat-bottom display-flex align-center">
             <MdOutlineEmojiEmotions className='bottom-emoji'/>
             <FiPlus className='bottom-emoji'/>
             <input type="text" className='text-message' onChange={(e) => setText(e.target.value)} value={text} id='text-message' placeholder='Type a message'/>
             <button className='bg-transparent' onClick={handleSend} ><IoMdSend className='bottom-emoji'/></button>
        </div>
      
    </>
  )
}
