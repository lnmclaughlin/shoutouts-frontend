import axios from "axios";
import ShoutOut from "../models/ShoutOut";

const baseUrl = process.env.REACT_APP_API_URL || "";

export const getAllShoutOuts = (): Promise<ShoutOut[]> => {
  return axios.get(`${baseUrl}`).then((res) => res.data);
};

export const postNewShoutOut = (so: ShoutOut): Promise<ShoutOut> => {
  return axios.post(`${baseUrl}`, so).then((res) => res.data);
};
