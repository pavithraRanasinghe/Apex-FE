import { Status } from "../pages/Dashboard";


export interface IShipment {
  id: number;
  trackingNumber: number;
  createdAt: string;
  recipientName: string;
  recipientAddress: string;
  recipientMobile: number;
  packageDescription: string;
  weight: number;
  price: number;
  shipmentStatus: IShipmentStatus;
  user?: IShipmentUser;
}

export interface IShipmentStatus {
  description: string;
  status: string;
  createdAt: string;
}

export interface IShipmentUser{
  id:number;
  name: string;
  email: string;
}
