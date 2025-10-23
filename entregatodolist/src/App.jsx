import React, { useState } from 'react';
import FormToDo from './assets/FormToDo';
import ListToDo from './assets/ListToDo'; 
import ToDo from './assets/ToDo'; 
import './App.css';

 
function App() {
  const [tasks, setTasks] = useState([]);  // Estado para las tareas

  // Función para agregar una tarea
  const addTask = (task) => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      setTasks([task, ...tasks]);  // Agrega la nueva tarea al principio
    }
  }; 


  // Función para eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));  // Filtra la tarea por ID
  };

  // Función para completar una tarea
  const completeTask = (id) => {
    setTasks(tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ))
  
  };

return (
    <div className="app">
      <img src="https://openexpoeurope.com/wp-content/uploads/2018/05/Logo-U-tad.jpg" alt="Descripción de la imagen" className="app-logo" />
      <h1>Lista de Tareas</h1>
      <div className="todo-container">
        <FormToDo onSubmit={addTask} />
        <ListToDo 
          tasks={tasks}
          deleteToDo={deleteTask}
          completeToDo={completeTask}
        />
      </div>
    </div>
  );
}

export default App;
