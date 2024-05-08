import axios from "axios";
import { API_BASE_URL } from "./constant.js";
import { endpoints } from "./apiEndpoints.js";

const retoolBaseApi = axios.create({
  baseURL: API_BASE_URL,
});

// allApplications
export const allApplications = async () => {
  return retoolBaseApi.get(endpoints.get("allApplications")!);
};

// memoryUtilization
export const memoryUtilization = async () => {
  return retoolBaseApi.get(endpoints.get("memoryUtilization")!);
};

// cpuUtilization
export const cpuUtilization = async () => {
  return retoolBaseApi.get(endpoints.get("cpuUtilization")!);
};

// eventHistory
export const eventHistory = async () => {
  return retoolBaseApi.get(endpoints.get("eventHistory")!);
};
