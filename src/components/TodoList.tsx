import React, { useContext } from 'react';
import { TodoContext } from '../context/Todo';
import SingleTodo from './SingleTodo';
import './styles.css';

const TodoList: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className='todos'>
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
