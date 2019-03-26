import "./Modal.scss";

import React from "react";

const Modal = ({ title, children, toggleModal, modalState }) => {
  return (
    <div
      className="modal-content"
      style={modalState ? { display: "flex" } : { display: "none" }}
    >
      <div className="modal-header">
        <h2>{title}</h2>
        <button className="close" onClick={toggleModal}>
          &times;{" "}
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  );
};

export default Modal;
