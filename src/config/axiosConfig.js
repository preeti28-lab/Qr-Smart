import axios from "axios";
import { getItemFromStore } from "../utils";


const getToken = () => {
  return getItemFromStore("qrmsart");
};



const setCustomizedHeaders = (contentType = "application/json") => {
  const token = getToken();
  // console.log("fetched" , token)
  return {
    "Content-Type": contentType,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const createAxiosInstance = (dispatch, config = {}) => {
  const { base = import.meta.env.VITE_SERVER_URL } = config;

  const axiosInstance = axios.create({
    baseURL: base,
    headers: setCustomizedHeaders(),
    credentials: "include",
    ...config,
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (requestConfig) => {
      const contentType =
        requestConfig.headers["Content-Type"] || "application/json";
      requestConfig.headers = setCustomizedHeaders(contentType);
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  let hasForbiddenErrorOccurred = false;
  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      if (error.response?.status === 403 && !hasForbiddenErrorOccurred) {
        hasForbiddenErrorOccurred = true;
        if (dispatch) {
          dispatch(logoutThunkMiddleware());
        }
      } else if (hasForbiddenErrorOccurred) {
        return new Promise(() => { });
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
