import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import './Signup.css'
import { Link } from 'react-router-dom'


const Signup = () => {

    const [signupData, setSignupData]=useState({fullname:"", email:"", password:""})
    const navigate=useNavigate()

    const handlechange=(e)=>{
    const {name, value}=e.target
setSignupData((prev)=>({...prev, [name]:value}))
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    const {fullname , email, password}=signupData
    if(!fullname || !email || !password){
     return  toast.error("field must be required")
    }
    try{
  const res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, signupData)
  console.log(res.data)
  toast.success("user registered successfully")
  setTimeout(() => {
    navigate('/login')
  }, 1000);
    }
    catch(error){
toast.error("Oops",error)
    }
  
}

    
  return (
    <div className='container'>
      
         <form className='form'onSubmit={handleSubmit} >
            <h1>Sign Up</h1>
            <div className='content'>
            <div>
              
                <input type="text" name='fullname' onChange={handlechange} placeholder='enter name'/>
            </div>
             <div>
                
                <input type="email" name='email' onChange={handlechange} placeholder='email' />
            </div>
             <div>
               
                <input type="password" name='password' placeholder='password' onChange={handlechange} />
            </div>

            <div className="btn">
<button type='submit'>Sign Up</button>
  <p >already have an account? <Link to='/login'>Login here</Link></p>
            </div>

</div>
         </form>
    </div>
  )
}

export default Signup