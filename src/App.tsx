import React, { useContext } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import './App.css';
import { AiOutlineClear } from 'react-icons/ai';
import { TodoContext } from './context/Todo';

const App: React.FC = () => {
  const { dispatch } = useContext(TodoContext);

  const handleClear = () => {
    dispatch({ type: 'set', payload: { active: [], completed: [] } });
  };

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField />
      <Header />
      <TodoList />
      <button className='clear-button' type='button'>
        <AiOutlineClear onClick={handleClear} />
      </button>
    </div>
  );
};

export default App;
