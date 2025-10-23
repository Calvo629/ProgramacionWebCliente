import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ToDo = ({ id, text, completed, completeToDo, deleteToDo }) => {
  return (
    <div className={completed ? "todo completed" : "todo"}>
      <div className="todo-text" onClick={() => completeToDo(id)}>
        {text}
      </div>
      <div className="todo-icon-container" onClick={() => deleteToDo(id)}>
        <AiOutlineCloseCircle className="todo-icon"/>
      </div>
    </div>
  );
};

export default ToDo;
