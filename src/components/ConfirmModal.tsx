import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";

type ConfirmProps = {
  show: boolean;
  onHide: () => void;
  onConfirm: ()=>void;
};

const ConfirmModal: FC<ConfirmProps> = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Status Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure, you want to update shipment status</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
