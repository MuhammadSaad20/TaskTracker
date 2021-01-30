import Header from './components/Header'
//import React from 'react' 
import {useState, useEffect} from 'react'
import Task from './components/Task'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {

    //for add task button toggle
    const [showAddtask,setShowAddTask]=useState(false)


    //tasks
    const [tasks, setTask]=useState([])
    //get data from json local server
    
    useEffect(()=>{
        const getTasks=async()=>{
            const taskFromServer=await fetchTask()
            setTask(taskFromServer)
        }
        getTasks()
    },[])

    const fetchTask=async()=>{
        const res =await fetch('http://localhost:5000/tasks')
        const data= await res.json()

        return data
    }

    //singular task fetch
    const fetchTasks = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }
 

    //Add task
    const addTask = async(task) =>{
        //console.log(task)
        // const id=Math.floor(Math.random()*1000)+1
        // const newTask = {id, ...task}
        // setTask([...tasks, newTask])
        const res= await fetch('http://localhost:5000/tasks',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(task)
        })
        const data= await res.json()
        setTask([...tasks,data])


    }
    //Delete Task
    const deleteTask = async (id) =>{
       await fetch(`http://localhost:5000/tasks/${id}`,{
           method:'DELETE',
       })
        // console.log('delete',id)
       setTask(tasks.filter((task)=>task.id!==id))
    }
    //on toggle remainer
    const toggleRemainder=async(id) =>{
        //console.log(id)
        const taskToggle =await fetchTasks(id)
        const updTask={...taskToggle,reminder: !taskToggle.reminder}
         const res=await fetch(`http://localhost:5000/tasks/${id}`,{
             method: 'PUT',
             headers: {
                 'Content-type':'application/json'
             },
             body: JSON.stringify(updTask)
         })
        
        const data = await res.json()

        setTask(
            tasks.map(
                (task)=>
                task.id===id? //if
                {...task,reminder:data.reminder}
                :task //else
                )
            )
    }

    return (
//    <Task tasks={tasks} onDelete={deleteTask} /> on  {tasks.length > 0? <Task tasks={tasks}.....}
//      <AddTask onAdd={addTask}/>
        <Router>

        <div className = "container" >
        <Header onAdd={()=>setShowAddTask (!showAddtask)} showAdd={showAddtask} />
        <Route path='/' exact render={(props) => (
            <>
                        {showAddtask && <AddTask onAdd={addTask} />}

                        {tasks.length > 0 ? <Task tasks={tasks} onDelete={deleteTask} onToggle={toggleRemainder} />
                            : 'No Task to Show'}

            </>
        )}/>
       
<Route path='/about' component={About}/>
       <Footer />
        </div>
        </Router>
    );
}
// <Header title={1} /> give error due to proptype set to string
//class mechanism
/*class App extends React.Component{
    render(){
        
        return (
        <h1>Hello from class</h1>
        )
    }
}*/

export default App;