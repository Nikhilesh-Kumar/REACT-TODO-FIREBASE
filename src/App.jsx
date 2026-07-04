import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TodoCard from "./components/TodoCard";
import Loader from "./components/Loader";
import { Show, SignInButton, SignUpButton, UserButton, useUser, useAuth } from '@clerk/react'
import logo from './assets/logo_1.png';
import Intro from "./components/Intro";



const firebaseUrl = 'https://frontend-cohort-84c1e-default-rtdb.asia-southeast1.firebasedatabase.app/';

function App() {

  let taskInput = useRef(null);
  let [todos, setTodos] = useState([]);
  let [formStatus, setFormStatus] = useState(false);
  let {user} = useUser();
  let {isSignedIn} = useAuth();


  function handleSubmit(){
    setFormStatus(true)
    let task = taskInput.current.value;
    axios.post(`${firebaseUrl}todos.json`,{
      title: task,
      createdBy: user.username,
    }).then(()=>{
      setFormStatus(false);
      taskInput.current.value = ''
      fetchTodos();
    })
  }

  function fetchTodos(){
      axios.get(`${firebaseUrl}todos.json`).then(todos=>{
        let tempTodos = []
        for(let key in todos.data){
          let todo = {
            id: key,
            ...todos.data[key]
          }
          tempTodos.push(todo);
        }
        setTodos(tempTodos)
      })
  }

  function handleDelete(id){
    axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{
      fetchTodos();
    })
  }

  useEffect(()=>{
    fetchTodos();
  },[])

  return (
    <>

      <div className="border border-b-neutral-300 py-2">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-5">
          <img className="h-6" src={logo} alt="" />
          <header className="flex gap-4">
            <Show when="signed-out">
              <SignInButton className="bg-black/70 text-white px-3 py-1 rounded-full text-sm" />
              <SignUpButton className="bg-black/70 text-white px-3 py-1 rounded-full text-sm" />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
        </div>
      </div>

      <Show when="signed-in">
        <div className="w-[400px] mx-auto mt-12">
          <h1 className="text-2xl font-bold">Manage your tasks <span className="text-neutral-600">@{isSignedIn ? user.firstName : ""}</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse rerum reiciendis molestiae?</p>
          <input ref={taskInput} className="mt-2 border rounded-xl p-3 w-full focus:outline-none border-neutral-300 text-sm text-neutral-700" type="text" placeholder="Add your favourite task"/>
          <button onClick={handleSubmit} className="mt-2 bg-black py-3 px-5 text-white rounded-xl flex items-center gap-4">{formStatus ? <Loader/> : "Create Task"}</button>

          <div className="mt-12">
            {
              todos.filter(todo => isSignedIn ? todo.createdBy == user.username : true).map(todo=><TodoCard handleDelete={handleDelete} key={todo.id} id={todo.id} title={todo.title} />)
            }
          </div>
        </div>
      </Show>

      <Show when="signed-out">
        <Intro /> 
      </Show>
    </>
  )
}

export default App
