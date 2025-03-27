import React from 'react'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import Home from './pages/Home'
import {Loader} from 'lucide-react'

const App = () => {
  const {authUser, checkAuth} = useAuthStore()

  useEffect(() =>{
    checkAuth()
  },[checkAuth]);
  
  console.log({authUser});

  if(isCheckingAuth && !authUser) return (
     <div className='flex items-center justify-center h-screen'>
       <Loader className= "size-10 animate-spin" />
     </div>
  )

  return (
    <div>

     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="settings" element={<Setting/>}/>
      <Route path="profile" element={<Profile/>}/>

     </Routes>

    </div>
  )
}

export default App
