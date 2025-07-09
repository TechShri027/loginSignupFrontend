import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Task = () => {

    const [taskData, setTaskData]=useState({task:"", description:""})
    const [tasks, setTasks]=useState([])

    const userId=localStorage.getItem("userId")
    useEffect(()=>{
        if(userId){
            fetchTasks()
        }
    },[])

    const handlechange=(e)=>{
        const{name, value}=e.target
       setTaskData((prev)=>({...prev, [name]:value}))
    }


    const fetchTasks=async()=>{
        try {
              const res=await axios.get(`http://localhost:8080/api/tasks/getTask/${userId}`)
              setTasks(res.data)
        } catch (error) {
         toast.error("failed to get tasks")
        }
      
    }

    const addTask=async(e)=>{
        e.preventDefault()
        const{task,description}=taskData
        if(!task || !description){
            return toast.error("field must be required")
        }
        try{
const addtask=await axios.post('http://localhost:8080/api/tasks/addTask', {...taskData, userId})
toast.success("task added successfully")


fetchTasks()
        }catch(error){
toast.error("oops", error)
        }
    }





    const handleUpdate=async(id)=>{
  const newtask=prompt("enter new task")
  const newdescription=prompt("enter new decription")
if(newtask && newdescription){
    try {
        const updatetask=await axios.put(`http://localhost:8080/api/tasks/updateTask/${id}`,{
            task:newtask,
            description:newdescription
        })
         fetchTasks();
        toast.success("task updated successfully")
    } catch (error) {
        toast.error("task updation failed")
    }
}    
}


const handleDelete=async(id)=>{
    try {
        const deletetask=await axios.delete(`http://localhost:8080/api/tasks/deleteTask/${id}`)
        toast.success("delete successfully")
         fetchTasks();
    } catch (error) {
        toast.error("failed to delete task")
    }
}

  return (
    <div className='container'>

        <form  className='form'onSubmit={addTask}>
            <div className="content">
            <div>
                
                <input type="text" name="task" onChange={handlechange} placeholder='task' />
            </div>
            <div>
              
                <input type="text" name="description" onChange={handlechange}  placeholder='description'/>
            </div>
            <div className="btn">
<button type='submit'>add task</button>
            </div>
            
            </div>
        </form>




<ul>
     {tasks.map((items)=>{
          const {task, description}=items
      return    (
           <li key={items._id}><strong><p>{task}</p></strong>
           <p>{description}</p>
           <button className='btn' onClick={()=>{handleUpdate(items._id)}}>Update</button>
           <button className='btn' onClick={()=>{handleDelete(items._id)}}>Delete</button>
           </li>
          )
        })}
</ul>
       
    </div>
  )
}

export default Task