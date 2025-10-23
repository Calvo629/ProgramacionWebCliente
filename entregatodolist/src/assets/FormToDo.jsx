import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FormToDo = (props) => {
  const [input, setInput] = useState('');

  const handleChange = (content) => {
    setInput(content.target.value);
}

  const handleSend = (content) => {
    content.preventDefault();
    const newTask = {
      id: uuidv4(),
      text: input,
      completed: false
    };
    props.onSubmit(newTask);  // Llama a la función 'onSubmit' pasada como prop
    setInput('');  // Limpiar el campo de entrada después de agregar la tarea
  }
 
  return (
    <form className="formulario" onSubmit={handleSend}>
      <input
        className="formulario-input"
        type="text"
        placeholder="Escribe una tarea"
        name ="text"
        value ={input}
        onChange={handleChange}
      />
      <button className="formulario-button">
        Agregar tarea
      </button>
    </form>
  );
}

export default FormToDo;