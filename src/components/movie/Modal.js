import React from "react";
import "./Modal.scss";
import PropTypes from "prop-types";

/**
 * A modal component which renders modal(s)
 * takes `children`, `toggleModal`{func}, `modalState` {bool} as props
 * `children` are the content inside modal
 * `toggleModal` is function which is used to close modal 
 * `modalState` is a bool which indicates whether modal is active or not
 */

const Modal = ({ children, toggleModal, modalState }) => {

  return (
    <div
      className="modal"
      style={modalState ? { display: "flex" } : { display: "none" }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <button className="close" onClick={toggleModal} title="close">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};



//Type checking
Modal.propTypes = {
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  modalState: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default Modal;
