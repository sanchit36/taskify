import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone, MdClose } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';

import { Todo } from '../models/model';
import { TodoContext } from '../context/Todo';
import Modal from './Modal';
import { deleteTask, updateTask } from '../firebase/todo';
import Spinner from './Spinner';
import './SingleTodo.css';

interface SingleTodoProps {
  todo: Todo;
  index: number;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ todo, index }) => {
  const { loading, dispatch } = useContext(TodoContext);
  const [editTodo, setEditTodo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  const handleEdit = (text: string) => {
    if (editTodo === null && !todo.isDone) {
      setEditTodo(text);
    }
  };

  const handleDelete = () => {
    setShow(true);
  };

  const handleDone = async () => {
    dispatch({ type: 'loading', payload: `update-${todo.id}` });
    await updateTask(todo.id, { isDone: !todo.isDone });
    dispatch({ type: 'done', payload: todo });
    dispatch({ type: 'loading', payload: null });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editTodo) {
      dispatch({ type: 'loading', payload: `update-${todo.id}` });
      await updateTask(todo.id, { todo: editTodo });
      dispatch({ type: 'update', payload: { id: todo.id, text: editTodo } });
      dispatch({ type: 'loading', payload: null });
    }
    setEditTodo(null);
  };

  useEffect(() => {
    if (editTodo !== null) inputRef.current?.focus();
  }, [editTodo]);

  const cancelDeleteHandler = () => {
    setShow(false);
  };

  const confirmDeleteHandler = async () => {
    dispatch({ type: 'loading', payload: 'delete' });
    await deleteTask(todo.id);
    dispatch({ type: 'loading', payload: null });
    dispatch({ type: 'delete', payload: todo.id });
    setShow(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onCancel={cancelDeleteHandler}
        header='Are you sure you want to delete this task?'
        footer={
          <React.Fragment>
            <button className='btn' onClick={cancelDeleteHandler}>
              CANCEL
            </button>
            <button
              className='btn danger'
              onClick={confirmDeleteHandler}
              disabled={loading === 'delete'}
            >
              {loading === 'delete' && (
                <Spinner
                  style={{
                    width: '20px',
                    height: '20px',
                    margin: 'auto',
                  }}
                />
              )}
              DELETE
            </button>
          </React.Fragment>
        }
      />
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
              onSubmit={handleEditSubmit}
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
                <div className='todos__single--icons'>
                  <button
                    type='submit'
                    className='icon'
                    disabled={loading === `update-${todo.id}`}
                  >
                    {loading === `update-${todo.id}` ? (
                      <Spinner
                        style={{
                          width: '20px',
                          height: '20px',
                          margin: 'auto',
                        }}
                      />
                    ) : (
                      <MdDone />
                    )}
                  </button>
                </div>
              ) : (
                <div className='todos__single--icons'>
                  {!todo.isDone && (
                    <span
                      className='icon'
                      onClick={() => handleEdit(todo.todo)}
                    >
                      <AiFillEdit />
                    </span>
                  )}
                  <span className='icon' onClick={handleDelete}>
                    <AiFillDelete />
                  </span>
                  {!todo.isDone ? (
                    <span className='icon' onClick={handleDone}>
                      {loading === `update-${todo.id}` ? (
                        <Spinner
                          style={{
                            width: '20px',
                            height: '20px',
                            margin: 'auto',
                          }}
                        />
                      ) : (
                        <MdDone />
                      )}
                    </span>
                  ) : (
                    <span className='icon' onClick={handleDone}>
                      {loading === `update-${todo.id}` ? (
                        <Spinner
                          style={{
                            width: '20px',
                            height: '20px',
                            margin: 'auto',
                          }}
                        />
                      ) : (
                        <MdClose />
                      )}
                    </span>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </Draggable>
    </React.Fragment>
  );
};

export default SingleTodo;
