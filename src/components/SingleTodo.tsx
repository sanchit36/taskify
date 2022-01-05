import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../models/model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { TodoContext } from '../context/Todo';

interface SingleTodoProps {
  todo: Todo;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const [editTodo, setEditTodo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (text: string) => {
    if (editTodo === null && !todo.isDone) {
      setEditTodo(text);
    }
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'delete', payload: id });
  };

  const handleDone = (id: number) => {
    dispatch({ type: 'done', payload: id });
  };

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editTodo) {
      dispatch({ type: 'update', payload: { id, text: editTodo } });
    }
    setEditTodo(null);
  };

  useEffect(() => {
    if (editTodo !== null) inputRef.current?.focus();
  }, [editTodo]);

  return (
    <form
      className='todos__single'
      onSubmit={(e) => handleEditSubmit(e, todo.id)}
    >
      {editTodo !== null ? (
        <input
          ref={inputRef}
          type='text'
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className='todos__single--text'
        />
      ) : (
        <span className={`todos__single--text ${todo.isDone ? 'done' : ''}`}>
          {todo.todo}
        </span>
      )}

      {editTodo !== null ? (
        <div>
          <button type='submit' className='icon'>
            <MdDone />
          </button>
        </div>
      ) : (
        <div>
          <span className='icon' onClick={() => handleEdit(todo.todo)}>
            <AiFillEdit />
          </span>
          <span className='icon' onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className='icon' onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      )}
    </form>
  );
};

export default SingleTodo;
