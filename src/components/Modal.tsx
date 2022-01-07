import React from 'react';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';
import './styles.css';

interface ModalOverlayProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  header?: string;
  headerClass?: string;
  style?: React.CSSProperties;
  footer?: React.ReactNode;
  footerClass?: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDom.createPortal(content, document.getElementById('modal-hook')!);
};

interface ModalProps extends ModalOverlayProps {
  show: boolean;
  onCancel: React.MouseEventHandler<HTMLDivElement>;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
