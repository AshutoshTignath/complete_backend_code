import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const Home = () => {
  const {isAuthenticated} = useContext(Context);
  const navigateto = useNavigate();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState([]);

  const getalltask = async()=>{
    try {
      const {data} = await axios.get("http://localhost:4000/api/v1/task/my", {withCredentials: true})
      setTasks(data.tasks)
    } catch (error) {
      setTasks([]);
    }
  }

  const addtasks = async()=>{
    try {
      const {data} = await axios.post("http://localhost:4000/api/v1/task/add", {title, description},{withCredentials:true, headers:{"Content-Type":"application/json"}})
      toast.success(data.message);
      getalltask();
    } catch (error) {
      toast.error(error.reponse.data.message)
    }
  }

  const deletetasks = async(id )=>{
    try {
      const {data} = await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`,{withCredentials:true})
      toast.success(data.message);
      getalltask();
    } catch (error) {
      toast.error(error.reponse.data.message)
    }
  }

  const updatetasks = async(id )=>{
    const updatedtasks = tasks.find(task=>task._id === id);
   await axios.put(`http://localhost:4000/api/v1/task/update/${id}`, updatedtasks, {withCredentials: true}).then(res=>{
     toast.success(res.data.message)
   }).catch(error=>{
    toast.error(error.response.data.message)
   })
  }

  const handleinputchange = (taskid , field, value)=>{
         setTasks((prevTasks)=>
          prevTasks.map((task)=>
         task._id === taskid ? {...task,[field]:value}:task   
          )
         )
  }
   
  useEffect(()=>{
    if(!isAuthenticated)
      {
          navigateto("/login");
      }
      getalltask();
  },[isAuthenticated])
  
  return (
    <>
       <section className='home'>
    
          <h1>CREATE YOUR TASK</h1>
          <div className='createtask'>
            <input type="text" placeholder='your task title' value={title} onChange={(e)=>setTitle(e.target.value)}/>{" "}
            <textarea placeholder='your task description' value={description} 
            rows={10}
            onChange={(e)=>setDescription(e.target.value)}/> <button onClick={addtasks}>create task</button>
            </div>
            <div className='tasks'>
             {
               tasks && tasks.length>0 ? (
                tasks.map(element=>{
                    return (
                      <div className='card' key={element._id}>
                       <input type="text" value={element.title} onChange={(e)=> handleinputchange(element._id, "title", e.target.value)

                       }/>
                         <textarea  value={element.description} onChange={(e)=> handleinputchange(element._id, "description", e.target.value)}>{element.description}</textarea>
                         <div>
                          <button onClick={()=>deletetasks(element._id)}>Delete</button>
                          <button onClick={()=>updatetasks(element._id)}>update</button>
                         </div>
                      </div>
                    )
                })
               ): (<h1>No Tasks created</h1>)
             }
            </div>
     
       </section>
    
    </>
  )
}

export default Home   