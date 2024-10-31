import { Routes, Route } from "react-router-dom"

import Main_layout from "./components/layout"

import Login from "./components/login/login"
import Auth from "./components/auth/auth"


import CurrentTodo from "./components/todoCategories/CurrentTodo"
import TodosCat from "./components/todoCategories/TodosCat"

import AddTodo from "./components/addTodo/AddTodo"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Main_layout />}>
        <Route index element={<CurrentTodo />} />
        <Route path=":catId" element={<TodosCat/>} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/add-todo" element={<AddTodo/>} />
    </Routes>
  )
}

export default App
