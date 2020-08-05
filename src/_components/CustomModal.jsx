import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CustomModal = (props) => {
  const [show, setShow] = useState(false);
  const { handleAction, btn, val, content } = props;

  const handleClose = (doAction) => {
    setShow(false);
    if (doAction) handleAction(val);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        variant={btn.variant}
        className={btn.className}
        onClick={handleShow}
      >
        {btn.innerHtml()}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{content.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content.description}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose(true);
            }}
          >
            {content.confirmBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { CustomModal };
