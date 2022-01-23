import React, { useContext, useEffect, useRef, useState } from 'react';

import { TodoContext } from '../context/Todo';
import { UserContext } from '../context/User';
import { addTask } from '../firebase/todo';
import Spinner from './Spinner';
import './styles.css';

const InputField: React.FC = () => {
  const { user } = useContext(UserContext);
  const { loading, dispatch } = useContext(TodoContext);
  const [todo, setTodo] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    if (todo) {
      dispatch({ type: 'loading', payload: 'add' });
      try {
        const newTodo = await addTask({
          isDone: false,
          todo,
          userId: user?.id!,
        });
        dispatch({ type: 'add', payload: newTodo });
      } catch (error) {
        dispatch({ type: 'error', payload: 'Unable to add todo.' });
      } finally {
        dispatch({ type: 'loading', payload: null });
        setTodo('');
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todo]);

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
      <button
        className='input__submit'
        type='submit'
        disabled={loading === 'add'}
      >
        {loading === 'add' ? (
          <Spinner style={{ height: '30px', width: '30px', margin: 'auto' }} />
        ) : (
          'GO'
        )}
      </button>
    </form>
  );
};

export default InputField;
