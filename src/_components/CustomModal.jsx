import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

const CustomModal = (props) => {
  const [show, setShow] = useState(false);
  const { handleAction, btn, val, content } = props;
  const { t } = useTranslation();
  const styles = btn.style;
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
        style={{ styles }}
        size={btn.size}
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
            {t("modal.close")}
          </Button>
          <Button
            variant={
              content.confirmBtn === t("alerts.del-modal.confirmBtn")
                ? "danger"
                : "primary"
            }
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
