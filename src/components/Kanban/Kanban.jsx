import React, { useState, useRef, useEffect } from 'react'
import Task from './Task';

const Kanban = () => {
    const [tasks,setTasks] = useState([]);
    const inputText = useRef();
    
    const getTasksByStage = (stage) => tasks.filter((task) => task.stage === stage);

    const createTask = () => {
        const name = inputText.current.value.trim();
        if(tasks.some((task)=>task.name===name) || name===""){
            alert("Task already exists");
            return;
        }
        const newTask = {
            name : name,
            id : tasks.length + 1,
            stage : 0
        };
        inputText.current.value = "";
        setTasks(() => [...tasks , newTask]);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            createTask();
        }
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id!==id);
        setTasks(updatedTasks);
    }

    const updateStage = (id,step) => {
        const updatedTasks = tasks.filter((task) => {
            if(task.id===id){
                task.stage = Math.max(0,Math.min(3,task.stage+step));
            }
            return task;
        });
        setTasks(updatedTasks)
    }

    const stages = [
        { name: 'Backlog', tasks: getTasksByStage(0) },
        { name: 'In Progress', tasks: getTasksByStage(1) },
        { name: 'Done', tasks: getTasksByStage(2) },
    ];

  return (
    <div className='min-h-screen flex flex-col justify-start items-center gap-10 p-20'>
        <div className='flex flex-row gap-10 justify-center items-center w-1/2'>
            <input type='text' placeholder='Enter task name' className='border px-5 py-3 rounded-md w-3/4' ref={inputText} onKeyDown={handleKeyPress}/>
            <button className='px-5 py-3 bg-[#0a8a32] text-white shadow-lg w-1/4' onClick={createTask}>Create task</button>
        </div>
        <div className='flex flex-row justify-around items-start w-full'>
            {stages.map((stage,idx)=>{
                return (
                <div className='flex flex-col justify-start items-center w-3/12 shadow-lg min-h-[500px]' key={idx}>
                    <div className='bg-[#0a8a32] text-white w-full flex justify-center items-center p-3'>{stage.name}</div>
                    <div className='p-5 w-full flex flex-col gap-3'>
                        {stage.tasks.map((task) => {
                            return (
                                <Task increment={()=>updateStage(task.id,1)} decrement={()=>updateStage(task.id,-1)} name={task.name} deleteTask={()=>deleteTask(task.id)} key={task.id}/>
                            )
                        })}
                    </div>
                </div>);
            })}
        </div>
    </div>
  )
}

export default Kanban