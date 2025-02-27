/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Todo from './Todo'
const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  return (
    <>
      {
        todos.map(
          todo => <Todo  todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
        ).reduce((acc, cur) => [...acc, <hr />, cur], [])
      }
    </>
  )
}

export default TodoList
