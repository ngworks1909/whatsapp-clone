import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }
  
  return (
    <>
      <Router>
      <Routes>
        <Route  path='/'  element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }></Route>
        <Route  path='/login'  element={<Login/>}></Route>
        <Route  path='/register' element={<Register />}></Route>
      </Routes>
     </Router>
    </>
  );
}

export default App;
