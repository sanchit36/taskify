import React from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField />
      <TodoList />
    </div>
  );
};

export default App;
