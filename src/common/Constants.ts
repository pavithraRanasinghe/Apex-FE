import { Status } from "../pages/Dashboard";

//Http Methods
export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

//Local Storage Keys
export const USER = "user";
export const IS_TOKEN_EXPIRED = false;

//Email REGEX
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const STATUS_INFO = {
  PENDING: {value: Status.PENDING, color: 'secondary' },
  ACCEPTED: {value: Status.ACCEPTED, color: 'info' },
  ACTIVE: {value: Status.ACTIVE, color: 'primary' },
  DONE: {value: Status.DONE, color: 'success' },
  CANCELLED: {value: Status.CANCELLED, color: 'danger' },
  RETURN: {value: Status.RETURN, color: 'danger' },
}

export const SHIPMENT_STATUS = [
  STATUS_INFO.PENDING,
  STATUS_INFO.ACCEPTED,
  STATUS_INFO.ACTIVE,
  STATUS_INFO.DONE,
  STATUS_INFO.CANCELLED,
  STATUS_INFO.RETURN
];

