import { FC, MouseEventHandler, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { request } from "../common/APIManager";
import { getUserStorage } from "../common/PersistanceManager";
import { IUser } from "../interfaces/User";
import * as Constants from "../common/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ShipementProps = {
  show: boolean;
  onHide: ()=>void;
};

const ShipmentModel: FC<ShipementProps> = (props: ShipementProps) => {
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientMobile, setRecipientMobile] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    const user = getUserStorage();
    if (user) {
      setUser(user);
    } else {
      console.log("LOGOUT");
    }
  }, []);

  const handleRecipientName = (event: any) => {
    setRecipientName(event.target.value);
  };
  const handleRecipientAddress = (event: any) => {
    setRecipientAddress(event.target.value);
  };

  const handleRecipientMobile = (event: any) => {
    setRecipientMobile(event.target.value);
  };

  const handlePackageDescription = (event: any) => {
    setPackageDescription(event.target.value);
  };

  const handleWeight = (event: any) => {
    setWeight(event.target.value);
  };

  /**
   * Create new shipment
   */
  const handleCreate = () => {
    const url = "/api/shipment";
    const body = JSON.stringify({
      recipientName: recipientName,
      recipientAddress: recipientAddress,
      recipientMobile: parseInt(recipientMobile),
      packageDescription: packageDescription,
      weight: parseFloat(weight),
      userId: user.id,
    });
    request(url, Constants.POST, body)
      .then((response: any) => {
        toast.success(response.message);
        clearField();
      })
      .catch((error) => {
        toast.error("Shipment not created");
      });
  };
  
  const clearField = ()=>{
    setRecipientName("");
    setRecipientAddress("");
    setRecipientMobile("");
    setPackageDescription("");
    setWeight("");
  }

  return (
    <div>
      <Modal
        className="shipment-modal"
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new shipment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-3">
            <FloatingLabel
              controlId="name"
              label="Recipient name"
              className="mb-3 txtInput"
            >
              <Form.Control
                type="text"
                placeholder="Recipient name"
                value={recipientName}
                onChange={handleRecipientName}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="address"
              label="Address"
              className="mb-3 txtInput"
            >
              <Form.Control
                type="text"
                placeholder="Recipient address"
                value={recipientAddress}
                onChange={handleRecipientAddress}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="mobile"
              label="Recipient contact Number"
              className="mb-3 txtInput"
            >
              <Form.Control
                type="text"
                placeholder="Recipient contact Number"
                value={recipientMobile}
                onChange={handleRecipientMobile}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="description"
              label="Package description"
              className="mb-3 txtInput"
            >
              <Form.Control
                type="text"
                placeholder="Package description"
                value={packageDescription}
                onChange={handlePackageDescription}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="weight"
              label="Package weight"
              className="mb-3 txtInput"
            >
              <Form.Control
                type="text"
                placeholder="Package weight"
                value={weight}
                onChange={handleWeight}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ShipmentModel;
