import React, { useState } from "react";
import { Modal } from "bootstrap";

const RegisterModal = (props) => {
  const { onHide, show, backdrop } = props;

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button>Close</button>
          <button>Save Changes</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterModal;
