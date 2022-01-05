import React, { useContext, useRef, useState } from 'react';
import { TodoContext } from '../context/Todo';
import './styles.css';

const InputField: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo) {
      dispatch({ type: 'add', payload: todo });
      setTodo('');
    }
  };

  return (
    <form
      className='input'
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type='text'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a task'
        className='input__box'
      />
      <button className='input__submit' type='submit'>
        Go
      </button>
    </form>
  );
};

export default InputField;
