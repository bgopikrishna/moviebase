import React from "react";
import "./Modal.scss";
import { PropTypes } from "prop-types";

const Modal = ({
  title,
  children,
  toggleModal,
  modalState,
  iFrameLoading,
  onLoad
}) => {
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

Modal.propTypes = {
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  modalState: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default Modal;
