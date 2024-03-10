import { IUser } from "../interfaces/User";
import * as Constants from "./Constants";

/**
 * Save user to the local storage
 * 
 * @param user Logged user
 */
export const setUserStorage = async (user: IUser) => {
  try {
    const jsonValue = JSON.stringify(user);
    localStorage.setItem(Constants.USER, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Fetch user from the local storage
 * 
 * @returns 
 */
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

/**
 * Remove user from the local storage
 * 
 * @param user user
 */
export const removeUser = async (user: IUser) => {
  try {
    localStorage.removeItem(Constants.USER);
  } catch (e) {
    console.error(e);
  }
};