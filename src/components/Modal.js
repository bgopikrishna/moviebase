import "./Modal.scss";

import React from "react";

const Modal = ({ title, children, toggleModal, modalState }) => {
  return (
    <div
      className="modal-content"
      style={modalState ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-header">
        <button className="close" onClick={toggleModal}>
          &times;
        </button>
        <h2>{title}</h2>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  );
};

export default Modal;
