import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import { Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Task from './components/Task'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/task'element={<Task/>}></Route>
    </Routes>
<ToastContainer/>
    </>
  )
}

export default App
