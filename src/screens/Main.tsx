import React, { useContext, useState } from 'react';

import Header from '../components/Header';
import InputField from '../components/InputField';
import TodoList from '../components/TodoList';
import { AiOutlineClear } from 'react-icons/ai';
import { TodoContext } from '../context/Todo';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';

const Main: React.FC = () => {
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
    <React.Fragment>
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
      <Navbar />
      <InputField />
      <Header />
      <TodoList />
      <button className='clear-button' type='button'>
        <AiOutlineClear onClick={handleClear} />
      </button>
    </React.Fragment>
  );
};

export default Main;
