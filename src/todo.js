//usememo--> This hook memoizes the result of a computation
//seCallback: This hook memoizes a function definition -- for handler function--memory allocation is not redone

import React, { useState, useCallback, useMemo } from 'react';
import './todo.css';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');



  //The dependencies array ([dependencies]) specifies when the callback should be recreated. 
  //If any of these dependencies change, the callback is recreated; otherwise, it returns the memoized callback from the previous render.
  const addTask = useCallback(() => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: Date.now(), task: newTask, status: 'Todo' };
    setTasks(tasks => [...tasks, newTaskObj]);
    setNewTask(''); //newTask --> empty string so input field is cleared
  }, [newTask]); // run only if newTask value changes

  const changeStatus = useCallback((id, newStatus) => {                                     //ternary operator
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, status: newStatus } : task)); //  prevTasks represents the currentstate of array. It can be any arbitary name 
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);  //empty as i want to work on most recent one

  const taskList = useMemo(() => {
    return tasks.map(task => (                     //no func definition that why usememo
      <li key={task.id}>
        <span id ="span1"> Task: {task.task}  </span> <span id ="span2"> Current Status:  {task.status}</span>
        {task.status === 'Todo' && <button id='second' onClick={() => changeStatus(task.id, 'In Progress')}>In Progress</button>}
        {task.status === 'In Progress' && <button onClick={() => changeStatus(task.id, 'Complete')}>Complete</button>}
        <button id ='first' onClick={() => deleteTask(task.id)}>Delete</button>
      </li>
    ));
  }, [tasks, changeStatus, deleteTask]);

  return (
    <div className="todo">
     <h1>Status Changing App</h1>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {taskList}
      </ul>
    </div>
  );
}

export default Todo;


