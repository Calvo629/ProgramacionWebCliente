import React from 'react';
import ToDo from './ToDo';

const ListToDo = ({ tasks, deleteToDo, completeToDo }) => {
  return (
    <div>
      {tasks.map(task => (
        <ToDo 
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          deleteToDo={deleteToDo}
          completeToDo={completeToDo}
        />
      ))}
    </div>
  );
};
  
export default ListToDo;
