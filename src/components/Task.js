import Tasks from './Tasks'
const Task = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            {tasks.map((tasks)=> (
                <Tasks key={tasks.id} task={tasks} 
                onDelete={onDelete} onToggle={onToggle}
                />
            )
            
            )}               
        </>
    )
}

export default Task