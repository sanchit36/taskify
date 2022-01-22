import React from 'react';

interface Props {
  icon: React.ReactNode;
  text: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
}

const IconButton: React.FC<Props> = (props) => {
  return (
    <button style={props.style} className='icon-btn' onClick={props.onClick}>
      <span className='icon'>{props.icon}</span>
      {props.text}
    </button>
  );
};

export default IconButton;
