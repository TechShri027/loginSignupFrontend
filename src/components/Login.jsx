import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Login.css'
const Login = () => {

    const [loginData, setLoginData]=useState({email:"", password:""})
const navigate=useNavigate()
    const handlechange=(e)=>{
    const {name, value}=e.target
setLoginData((prev)=>({...prev, [name]:value}))
}

const handlesubmit=async(e)=>{
    e.preventDefault()
    const {email, password}=loginData
    if(!email || !password){
        return toast.error("field must required")
    }
    try {
        const res=await axios.post(`https://loginsignupbackend-60p0.onrender.com/api/auth/login`, loginData)
        localStorage.setItem('userId', res.data.userId)
        toast.success("login successfully")
        setTimeout(()=>{
          navigate('/task')
        }, 1000)
    } catch (error) {
        toast.error("failed to loggin")
    }
}
  return (
    <div className='container'>
     
        <form  className='form'onSubmit={handlesubmit}>
               <h1>Login</h1>
               <div className="content">
  <div>
                 {/* <label htmlFor="email">Email</label> */}
                <input type="email" name='email' onChange={handlechange} placeholder='email' />
            </div>
            <div>
                {/* <label htmlFor="password">Password</label> */}
                <input type="password" name='password' placeholder='password' onChange={handlechange} />
            </div>
            <div className='btn'>
            <button type='submit'>Login</button>
            <p >don't have an account? <Link to='/signup'>Signup here</Link></p>
            </div>
               </div>
          
        </form>
    </div>
  )
}

export default Login