import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import {Routes, Route, useNavigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) =>{
      if (user) {
        navigate('/netflix-clone/');
      } else {
        navigate('/netflix-clone/login');
      }
    })
  }, []);

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/netflix-clone/' element={<Home/>}/>
        <Route path='/netflix-clone/login' element={<Login/>}/>
        <Route path='/netflix-clone/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App