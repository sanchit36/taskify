import React from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField />
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
