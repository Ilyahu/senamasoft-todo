import React, { useState } from 'react'
import { Input, Button, Form, Divider } from "antd"
import TodoItem from './TodoItem';
import { useCreateTodo } from '../services/useCreateTodo';
import { useTodos } from '../services/useTodos';
import Loading from './Loading';
import Error from './Error';

export type Todo = {
  title: string,
  checked: boolean,
  _id: string
}

const Todo = () => {
  const {data: todos, isLoading, error} = useTodos()
  const {mutate: create} = useCreateTodo()
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    if (title) {
      create(title);
      setTitle("")
    }
  }

  
  if (isLoading) {
    return <Loading/>
  }
  
  if (error) {
    return <Error message={error.message}/>
  }

  return (
    <div className='todoContainer'>
      <Form className='todoControls' onSubmitCapture={handleSubmit}>
        <Input 
          type='text' 
          className='todoInput' 
          placeholder='Add your task'
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button htmlType='submit'>Add Task</Button>
      </Form>

      <Divider>To do List</Divider>
      
      {todos.map((todo: Todo) => {
        return (
          <TodoItem 
            key={todo._id}
            title={todo.title}
            id={todo._id}
            checked={todo.checked}
          />
        )
      }
      )}
    </div>
  )
}

export default Todo