import { Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import Header from "../components/Header";
import BadgeButton from "../components/BadgeButton";
import { FC, useEffect, useState } from "react";
import { request } from "../common/APIManager";
import * as Constants from "../common/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IShipment } from "../interfaces/Shipment";
import ConfirmModal from "../components/ConfirmModal";

export enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
  RETURN = "RETURN",
}

const AdminDashboard: FC = () => {
  const [shipmentList, setShipmentList] = useState([] as IShipment[]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(Status.PENDING);
  const [selectedShipment, setSelectedShipment] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(Status.PENDING);

  useEffect(() => {
    loadShipments(Status.PENDING);
  }, []);

  const loadShipments = (status: Status) => {
    const url = `/api/admin/shipment/status/${status}`;
    request(url, Constants.GET, null)
      .then((response: any) => {
        setShipmentList(response.data);
      })
      .catch((error) => {
        toast.error("Shipement fetch failed");
      });
  };

  const handleSelect = (event: any, data: IShipment) => {
    setShowConfirmModal(true);
    switch (event.target.value) {
      case 0:
        setSelectedStatus(Status.PENDING);
        break;
      case 1:
        setSelectedStatus(Status.ACCEPTED);
        break;
      case 2:
        setSelectedStatus(Status.ACTIVE);
        break;
      case 3:
        setSelectedStatus(Status.DONE);
        break;
      case 4:
        setSelectedStatus(Status.CANCELLED);
        break;
      case 5:
        setSelectedStatus(Status.RETURN);
        break;
    }
    setSelectedShipment(data.id)
  };

  const handleConfirm = () => {
    console.log('selectedStatus : ',selectedStatus)
    const url = '/api/admin/shipment';
    const body = JSON.stringify({
        shipmentId: selectedShipment,
        status: selectedStatus
    });
    request(url, Constants.PUT, body)
    .then((response: any)=>{
        toast.success('Status updated');
        loadShipments(currentStatus);
    }).
    catch(()=>{
        toast.error('Status not updated');
    })
    .finally(()=>{
        setShowConfirmModal(false);
    })
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
                setCurrentStatus(status.value);
                loadShipments(status.value);
              }}
            />
          </Col>
        ))}
      </Row>
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
            <th>Sender</th>
            <th>Status</th>
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
              <td>{data.user?.name}</td>
              <td>
                {
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e)=>handleSelect(e,data)}
                  >
                    <option>Update</option>
                    {Constants.SHIPMENT_STATUS.map((data, index) => (
                      <option key={index} value={index}>
                        {data.value}
                      </option>
                    ))}
                  </Form.Select>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
        }}
        onConfirm={handleConfirm}
      />
      <ToastContainer />
    </>
  );
};

export default AdminDashboard;
