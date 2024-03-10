
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
  date: string;
  active: boolean;
}

export interface IShipmentUser{
  id:number;
  name: string;
  email: string;
}

export interface IShipmentTrack {
  id: number;
  trackingNumber: number;
  createdAt: string;
  recipientName: string;
  recipientAddress: string;
  recipientMobile: number;
  packageDescription: string;
  weight: number;
  price: number;
  statusList: IShipmentStatus[];
  user?: IShipmentUser;
}
