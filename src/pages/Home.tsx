import React, { FC, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import * as Constants from "../common/Constants";
import BadgeButton from "../components/BadgeButton";
import { request } from "../common/APIManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IShipmentTrack } from "../interfaces/Shipment";
import Header from "../components/Header";

const Home: FC = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState({} as IShipmentTrack);
  const [isTrack, setIsTrack] = useState(false);

  const changeTrackingNumber = (event: any) => {
    setTrackingNumber(event.target.value);
  };

  const onSearch = () => {
    const url = `/api/public/shipment/${trackingNumber}`;
    request(url, Constants.GET, null)
      .then((response: any) => {
        setIsTrack(true);
        setShipment(response.data);
      })
      .catch((error) => {
        toast.error("Shipment not found");
      });
  };
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center mt-4">
        <h2>APEX COURIER SERVICE</h2>
      </div>
      <Container>
        <Row className="m-5 g-2">
          <Col md className="col-4">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter Tracking Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Tracking Number"
                onChange={changeTrackingNumber}
              />
            </FloatingLabel>
          </Col>
          <Col className="col-2">
            <Button type="button" variant="primary" onClick={onSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </Container>
      {isTrack && (
        <>
          <Row className="m-5 g-2">
            <Col className="col-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Recepient Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Recepient Name"
                  readOnly
                  value={shipment.recipientName}
                />
              </FloatingLabel>
            </Col>
            <Col className="col-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Recepient Address"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Recepient Address"
                  readOnly
                  value={shipment.recipientAddress}
                />
              </FloatingLabel>
            </Col>
            <Col className="col-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Package Description"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Package Description"
                  readOnly
                  value={shipment.packageDescription}
                />
              </FloatingLabel>
            </Col>
            <Col className="col-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Start Date"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Start Date"
                  readOnly
                  value={shipment.createdAt.split("T")[0]}
                />
              </FloatingLabel>
            </Col>
            <Col className="col-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Sender"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Sender"
                  readOnly
                  value={shipment.user?.name}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="m-5">
            {shipment.statusList.map((status, index) => (
              <Col key={index}>
                <Card
                  bg={status.active ? "success" : "dark"}
                  key={index}
                  text="light"
                  style={{ width: "12rem" }}
                  className="mb-2"
                >
                  <Card.Header>{status.status}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {status.description !== null
                        ? status.description
                        : "No desription"}{" "}
                    </Card.Title>
                    <Card.Text>{status.date.split("T")[0]}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
