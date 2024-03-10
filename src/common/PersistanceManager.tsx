import { IUser } from "../interfaces/User";
import * as Constants from "./Constants";

export const setUserStorage = async (user: IUser) => {
  try {
    console.log('USER : ', user);
    const jsonValue = JSON.stringify(user);
    localStorage.setItem(Constants.USER, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getUserStorage = () => {
  try {
    const value = localStorage.getItem(Constants.USER);
    if(!value){
      return null;
    }
    return JSON.parse(value);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const removeUser = async (user: IUser) => {
  try {
    localStorage.removeItem(Constants.USER);
  } catch (e) {
    console.error(e);
  }
};