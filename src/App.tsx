import React, { useContext, useState } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import './App.css';
import { AiOutlineClear } from 'react-icons/ai';
import { TodoContext } from './context/Todo';
import Modal from './components/Modal';

const App: React.FC = () => {
  const { dispatch } = useContext(TodoContext);
  const [show, setShow] = useState(false);

  const handleClear = () => {
    setShow(true);
  };

  const cancelClearHandler = () => {
    setShow(false);
  };

  const confirmClearHandler = () => {
    setShow(false);
    dispatch({ type: 'set', payload: { active: [], completed: [] } });
  };

  return (
    <div className='App'>
      <Modal
        show={show}
        onCancel={cancelClearHandler}
        header='Are you sure you want to delete all your tasks?'
        footer={
          <React.Fragment>
            <button className='btn' onClick={cancelClearHandler}>
              CANCEL
            </button>
            <button className='btn danger' onClick={confirmClearHandler}>
              CLEAR
            </button>
          </React.Fragment>
        }
      />
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
