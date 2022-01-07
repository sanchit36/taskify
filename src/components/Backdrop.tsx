import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

interface BackdropProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return ReactDOM.createPortal(
    <div className='backdrop' onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')!
  );
};

export default Backdrop;
