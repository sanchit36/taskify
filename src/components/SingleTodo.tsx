import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../models/model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

interface SingleTodoProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ todo, todos, setTodos }) => {
  const [editTodo, setEditTodo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (text: string) => {
    if (editTodo === null && !todo.isDone) {
      setEditTodo(text);
    }
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editTodo) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: editTodo } : t))
      );
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
