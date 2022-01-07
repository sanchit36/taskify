import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../models/model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone, MdClose } from 'react-icons/md';
import { TodoContext } from '../context/Todo';
import { Draggable } from 'react-beautiful-dnd';

interface SingleTodoProps {
  todo: Todo;
  index: number;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ todo, index }) => {
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

  const handleDone = () => {
    dispatch({ type: 'done', payload: todo });
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <form
            className={`todos__single ${snapshot.isDragging ? 'drag' : ''}  ${
              todo.isDone ? 'done' : ''
            }`}
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
              <span className='todos__single--text'>{todo.todo}</span>
            )}

            {editTodo !== null ? (
              <div>
                <button type='submit' className='icon'>
                  <MdDone />
                </button>
              </div>
            ) : (
              <div>
                {!todo.isDone && (
                  <span className='icon' onClick={() => handleEdit(todo.todo)}>
                    <AiFillEdit />
                  </span>
                )}
                <span className='icon' onClick={() => handleDelete(todo.id)}>
                  <AiFillDelete />
                </span>
                {!todo.isDone ? (
                  <span className='icon' onClick={() => handleDone()}>
                    <MdDone />
                  </span>
                ) : (
                  <span className='icon' onClick={() => handleDone()}>
                    <MdClose />
                  </span>
                )}
              </div>
            )}
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
