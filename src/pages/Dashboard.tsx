import { Button, Col, Row, Table } from "react-bootstrap";
import Header from "../components/Header";
import BadgeButton from "../components/BadgeButton";
import { FC, useEffect, useState } from "react";
import { request } from "../common/APIManager";
import * as Constants from "../common/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IShipment } from "../interfaces/Shipment";
import ShipmentModel from "../components/ShipmentModel";

export enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
  RETURN = "RETURN",
}

const Dashboard: FC = () => {
  const [shipmentList, setShipmentList] = useState([] as IShipment[]);
  const [showShipmentModel, setShowShipmentModel] = useState(false);

  /**
   * Load pending shipments when render the page
   */
  useEffect(() => {
    loadShipments(Status.PENDING);
  }, []);

  /**
   * Load all shipements by status
   * Related to logged user
   * 
   * @param status Shipment status
   */
  const loadShipments = (status: Status) => {
    const url = `/api/shipment/status/${status}`;

    request(url, Constants.GET, null)
      .then((response: any) => {
        setShipmentList(response.data);
      })
      .catch((error) => {
        toast.error("Shipement fetch failed");
      });
  };

  return (
    <>
      <Header />
      <Row className="m-5">
        {Constants.SHIPMENT_STATUS.map((status, index) => (
          <Col key={index}>
            <BadgeButton
              variant={status.color}
              count={1}
              text={status.value}
              onClick={() => {
                loadShipments(status.value);
              }}
            />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-end">
        <Button
          className="mb-4 ms-1 btn"
          onClick={() => {
            console.log("SHOW");
            setShowShipmentModel(true);
          }}
        >
          CREATE SHIPMENT
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Create Date</th>
            <th>Name</th>
            <th>Address</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Package Description</th>
          </tr>
        </thead>
        <tbody>
          {shipmentList.map((data, index) => (
            <tr key={index}>
              <td>{data.trackingNumber}</td>
              <td>{data.createdAt.split("T")[0]}</td>
              <td>{data.recipientName}</td>
              <td>{data.recipientAddress}</td>
              <td>{data.weight}</td>
              <td>{data.price}</td>
              <td>{data.packageDescription}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ShipmentModel
        show={showShipmentModel}
        onHide={() => {
          setShowShipmentModel(false);
        }}
      />
      <ToastContainer />
    </>
  );
};

export default Dashboard;
