import ProgressBar from '@ramonak/react-progress-bar';
import React, { useContext } from 'react';

import { TodoContext } from '../context/Todo';
import { UserContext } from '../context/User';

const Header = () => {
  const { user } = useContext(UserContext);
  const {
    todos: { active, completed },
  } = useContext(TodoContext);
  const totalTodos = active.length + completed.length;
  const completedPercentage = totalTodos
    ? Math.floor((completed.length / totalTodos) * 100)
    : 0;

  const message = totalTodos === 1 ? 'Task' : 'Tasks';

  return (
    <div className='header'>
      {user?.displayName && (
        <h4 className='header__subtitle'>Welcome, {user?.displayName}</h4>
      )}
      <h2 className='header__title'>
        {active.length ? (
          <span>
            Total {active.length} {message} left
          </span>
        ) : totalTodos ? (
          <span>Yayyyyyy, You are done for the day</span>
        ) : (
          <span>Add Some Tasks, Have a good day !</span>
        )}
      </h2>
      <ProgressBar
        completed={completedPercentage}
        margin='auto'
        width='50%'
        bgColor='rgb(90, 230, 30)'
        baseBgColor='#fff'
      />
    </div>
  );
};

export default Header;
