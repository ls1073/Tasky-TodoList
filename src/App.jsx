import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
   if(todoString){
     let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
   }
  }, [])
  

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit = (e, id) => {
     let t = todos.filter(i => i.id === id)
     setTodo(t[0].todo)
     let newTodos = todos.filter(item => {
      return item.id!== id;
    });
    setTodos(newTodos)
    saveToLs();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id!== id;
    });
    setTodos(newTodos)
    saveToLs();
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, iscompleted: false }])
    setTodo("")
    saveToLs();
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    saveToLs();
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-blue-200 p-5 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-center text-3xl'>TASKY - Manage Your Todos At One Place</h1>
        <div className="addTodo flex flex-col gap-4">
          <h2 className='text-2xl font-bold my-5'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='bg-white w-full rounded-xl' />
          <button disabled ={todo.length<3} onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-5 rounded-full text-sm font-bold text-white m-6 disabled:bg-violet-300 mx-2'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'> No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex  justify-between my-4">
              <div className='flex gap-5'>
                 <input name= {item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id= "" />
              <div className={item.iscompleted?"line-through" :""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit />
</button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
