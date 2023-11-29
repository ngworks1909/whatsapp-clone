import React,{useState,useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { IoSearch } from "react-icons/io5";
import '../css/Search.css'
import { collection, query, where, getDocs ,doc,updateDoc,getDoc,setDoc,serverTimestamp} from "firebase/firestore";
import { db } from '../firebase';
import Alert from './Alert';

export default function Search() {

    const [user,setUser] = useState(null);
    const [err,setErr] = useState(false);
    const [username, setUsername] = useState("");

    const {currentUser} = useContext(AuthContext);
  
  

  const handleSearch = async() =>{
     const q = query(
      collection(db,"users"),
      where("displayName","==",username)
      );
      

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
           setUser(doc.data());
        });        
      } catch (error) {
         setErr(true);
         setTimeout(() => {
           setErr(false);
         }, 2000);
      }
  }

  const handleSelect = async() =>{
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid ;

    try {
        //check if chat exists
        const res = await getDoc(doc(db,"users",combinedId));
        if(!res.exists()){
            //create chat
            await setDoc(doc(db,"chats",combinedId),{messages : []});

            await updateDoc(doc(db,"userChats",currentUser.uid),{
                [combinedId + ".userInfo"] : {
                    uid : user.uid,
                    displayName : user.displayName,
                    photoURL : user.photoURL
                },
                [combinedId + ".date"] : serverTimestamp()
            });

            await updateDoc(doc(db,"userChats",user.uid),{
                [combinedId + ".userInfo"] : {
                    uid : currentUser.uid,
                    displayName : currentUser.displayName,
                    photoURL : currentUser.photoURL
                },
                [combinedId + ".date"] : serverTimestamp()
            });
        }
    } catch (error) {}
    setUser(null);
    setUsername("");
}
  

  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  }
  return (
    <>
      {err && <Alert type={'danger'} message={'User not found...'}/>}
      <div className="search display-flex align-center">
         <IoSearch className='search-icon'/>
         <input type="text" name="searchbar" id="searchbar" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} className='searchbar' placeholder='Search or start new chat'/>
      </div>

      {
            user && <div className="chat search-user display-flex align-center" onClick={handleSelect}>
              <input type="image" className='chat-image' src={user.photoURL} alt="" />
              <div className="chat-info display-flex flex-column">
                  <span className='chat-username'>{user.displayName}</span>
              </div>
          </div>
      }
      
    </>
  )
}
