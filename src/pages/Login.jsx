import React,{ useState} from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'
import Alert from '../components/Alert';

export default function Login() {
  const navigate = useNavigate();
  const [err,setErr] = useState(false);
  const handleLogin = async (e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
       await signInWithEmailAndPassword(auth,email,password);
       navigate("/");
       
       
      } catch (error) {
      setErr(true);
      setTimeout(() => {
         setErr(false);
      }, 3000);
    }
  }
  return (
    <>
       {err && <Alert type={'danger'} message={'Incorrect username or password'}/>}
       <div className="container-2 display-flex align-center justify-center">
       <div className="signup display-flex align-center flex-column">
           <h2 className='login-h2'>Login</h2>
           <form onSubmit={handleLogin} className="login-form display-flex flex-column">
            
                <div className="form-floating mb-3">
                   <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                   <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <input type="submit" className="btn btn-primary login-submit"value={"Login"}/>
           </form>
           <span className='not-user display-flex'>New user?<Link to="/register">Register</Link></span>
       </div>

     </div>
      
    </>
  )
}
