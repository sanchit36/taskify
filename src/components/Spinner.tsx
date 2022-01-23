import React from 'react';
import './Spinner.css';

interface Props {
  style?: React.CSSProperties;
}

const Spinner: React.FC<Props> = (props) => {
  return (
    <div className='spinner-overlay' style={props.style}>
      <div className='spinner' style={props.style}></div>
    </div>
  );
};

export default Spinner;
