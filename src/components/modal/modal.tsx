import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
  }


/*
  Modal that overlay all the application. Can be used to open some specifique part of the 
  app that we want to have quick access to (like settings) without a complete route associated. 
  (Quick access to settings allow user to, for exemple, modify ui settings quicly and smoothly).
  modal-root is in the main layout. 
*/
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');

	// If modalRoot is null, return null to avoid errors
	if (!modalRoot) {
		console.error('Modal root not found!');
		return null;
	}


  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
