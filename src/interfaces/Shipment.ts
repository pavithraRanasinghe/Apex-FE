import { Status } from "../pages/Dashboard";


export interface IShipment {
  trackingNumber: number;
  createdAt: string;
  recipientName: string;
  recipientAddress: string;
  recipientMobile: number;
  packageDescription: string;
  weight: number;
  price: number;
  shipmentStatus: IShipmentStatus;
}

export interface IShipmentStatus {
  description: string;
  status: Status;
  createdAt: string;
}
