import React,{useState} from 'react'
import { auth ,db} from '../firebase'
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/Login.css'
import Alert from '../components/Alert';
import img1 from '../assets/image.png'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';


export default function Register() {
  const navigate = useNavigate();

  
  const [err,setErr] = useState(false);
  const [res, setRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleRegister= async (e) =>{
    e.preventDefault();
    setErr(false);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      if(file !== undefined){
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, email);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              setErr(true);
              setLoading(false);
            }
          });
        });
    
  
         
      }
      else{
        setRes(true);
        setTimeout(() => {
          setRes(false);
       }, 3000);
      }

   } 
   catch (error) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
     }, 3000);
    }
  }
  return (
    <>
    {err && <Alert type={'danger'} message={'User already exists...'}/>} 
    {res && <Alert type={'danger'} message={'Image not selected'}/>} 
     <div className="container-2 display-flex align-center justify-center">
       <div className="login display-flex align-center flex-column">
           <h2 className='login-h2'>Register</h2>
           <form onSubmit={handleRegister} className="login-form display-flex flex-column">
                <div className="form-floating mb-3">
                   <input type="text" className="form-control" id="floatingInput-1" placeholder="name" required/>
                   <label  htmlFor="floatingInput-1">Username</label>
                </div>
                <div className="form-floating mb-3">
                   <input type="email" className="form-control"  id="floatingInput-2" placeholder="name@example.com" required/>
                   <label htmlFor="floatingInput-2">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password"  className="form-control" id="floatingPassword" placeholder="Password" required/>
                  <label  htmlFor="floatingPassword">Password</label>
                </div>
                <div className="pro-file">
                    <input type="file" style={{display:"none"}} name="whatsapp-dp" id="whatsapp-dp" />
                    <label htmlFor="whatsapp-dp" className='display-flex align-center whatsapp-label'>
                        <img src={img1} alt="" className='whatsapp-profile-pic'/>
                        <span>Add an avatar</span>
                    </label>
                </div>
                <input type="submit" className="btn btn-primary signup-submit" value={"Register"} disabled={loading}/>
           </form>
         
           <span className='not-user display-flex'>Already a user?<Link to="/login">Login</Link></span>
       </div>
     </div>
    </>
  )
}