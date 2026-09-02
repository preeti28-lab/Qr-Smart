import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";
import { updateContactInfo } from "../user";

const axiosInstance = createAxiosInstance();
const initialState = {
  allQrData: null,
  allBulkQR: null,
};


const qrCodesSlice = createSlice({
  name: "qrCodeDetails",
  initialState,
  reducers: {
    setQrCodes: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setQrCodes } = qrCodesSlice.actions;
export default qrCodesSlice.reducer;


export const getAllQrCodes = (
  params = {},
  callback = () => { }
) => {
  return async () => {
    try {
      const response = await axiosInstance.get("/qr-index/qr/getAll", {
        params,
      });

      if (response.status === 200) {
        const data = response?.data;

        callback(true, {
          qrCodes: data?.qrCodes || [],
          page: data?.page || 1,
          total: data?.total || 0,
          totalPages: data?.totalPages || 1,
        });
      }
    } catch (error) {
      console.log(error);
      let message = "error";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }
      toast.error(message);
      callback(false, {
        qrCodes: [],
        page: 1,
        total: 0,
        totalPages: 1,
      });
    }
  };
};

export const getAllBulkQRCodes = () => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.get("/bulkQr/listBulkJobs",);
      if (response.status === 200) {
        console.log("response is ", response)
        const data = response?.data;
        const reversedData = data.reverse();
        dispatch(setQrCodes({ allBulkQR: reversedData }))
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};


export const getSingleFolderQR = (payload) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.post("/bulkQr/byJobName", { jobName: payload });
      if (response.status === 200) {
        console.log("response is ", response)
        // const data = response?.data;
        // const reversedData = data.reverse();
        // dispatch(setQrCodes({ allBulkQR: reversedData }))
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};

export const getSingelQRCode = (id) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/qr-index/qr/getById/${id}`);

      if (response.status === 200) {
        const data = response?.data;

        dispatch(setQrCodes({ allQrData: data }));
        return data;
      }

      return null;
    } catch (error) {
      console.log(error);
      let message = "error";

      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }

      toast.error(message);
      return null;
    }
  };
};

export const changeQrStatus = (status) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.post("/new/changeStatus", status);
      if (response.status === 200) {
        console.log("response is ", response)
        const data = response?.data;
        const message = response?.data.message
        dispatch(getAllQrCodes())
        toast.success(message);
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};



export const delteQRAsset = (payload, callback = () => { }) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.post("/qr-index/qr/asset/delete", payload);
      if (response.status === 200) {
        console.log("response is ", response)
        const data = response?.data;
        toast.success(response?.data?.message);
        callback(true)
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};


export const deleteQRCode = (id) => {
  return async () => {
    try {
      const response = await axiosInstance.post(`/qr-index/qr/delete/${id}`);

      if (response.status === 200) {
        const message = response?.data?.message || "QR Code deleted successfully";
        toast.success(message);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      let message = "error";

      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }

      toast.error(message);
      return false;
    }
  };
};
export const deleteQRBulkFolder = (payload) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.post("/bulkQr/delete", payload);
      if (response.status === 200) {
        console.log("response is ", response)
        // const data = response?.data;
        const message = response?.data.message
        dispatch(getAllBulkQRCodes())
        toast.success(message);
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};


export const getAllImagesNames = (id, callback = () => { }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/new/listImageNames/${id}`);
      if (response.status === 200) {
        console.log("response is ", response)

        // dispatch(getAllQrCodes())
        callback(null, response.data);

      }
    }
    catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      callback(error, null);
      toast.error(message);
    }
  }
}

export const getTheImage = (imageName, callback = () => { }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/new/getImageFile/${imageName}`, {
        responseType: 'blob', // Important: Ensure you're expecting a blob response
      });

      if (response.status === 200) {
        // Return the Blob data so it can be handled in the component
        callback(null, response.data);
      }
    } catch (error) {
      let message = "Error fetching image";
      if (error?.response) {
        message = error?.response?.data?.message || message;
      }
      callback(error, null);
      toast.error(message);
    }
  };
};



export const getTheVideo = (videoCode, callback = () => { }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/new/getVideoFile/${videoCode}`);

      if (response.status === 200) {
        // Return the Blob data so it can be handled in the component
        callback(null, response.data);
      }
    } catch (error) {
      let message = "Error fetching image";
      if (error?.response) {
        message = error?.response?.data?.message || message;
      }
      callback(error, null);
      toast.error(message);
    }
  };
};



export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/qr-user/getById/${id}`);
      if (response.status === 200) {
        console.log("response is ", response)

      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};

export const updateProfile = (payload) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.post(`/qr-user/edit/${payload.id}`, payload);
      if (response.status === 200) {
        console.log("response is ", response)
        const data = response?.data;
        const message = response?.data.message
        // dispatch(getAllQrCodes())
        // ✅ extract only contact info
        const contactInfo = response?.data?.admin?.contactInformation;
        // ✅ update only that part in redux
        dispatch(updateContactInfo(contactInfo));
        toast.success(message);
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};



export const generateQuery = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.postForm(`/contact/query/add`, payload);
      if (response.status === 200 || response.status === 201) {
        console.log("response is ", response)
        const data = response?.data;
        const message = response?.data.message
        toast.success(message);
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    } finally {

    }
  };
};


export const resetPassword = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        `/qr-user/change-password/${payload.id}`,
        payload
      );

      if (response.status === 200) {
        const message = response?.data?.message + 'Please Login Again';
        toast.success(message);

        return { success: true }; // ✅ important
      }
    } catch (error) {
      let message = "error";

      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }

      toast.error(message);

      return { success: false }; // ✅ important
    }
  };
};


export const deleteAccount = (id) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        `/qr-user/delete/${id}`
      );

      if (response.status === 200) {
        const message = response?.data?.message;
        toast.success(message);
        return { success: true }; // ✅ important
      }
    } catch (error) {
      let message = "error";

      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }

      toast.error(message);

      return { success: false }; // ✅ important
    }
  };
};


export const createBulkQRCode = (payload, callback = () => { }, setBulkExcelLoader) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.postForm("/bulkQr/uploadExcel", payload);
      if (response.status === 200) {
        // console.log("response is ", response)
        const message = response?.data?.message;
        toast.success(message);
        setBulkExcelLoader(false)
        callback(true)
        // dispatch(getAllQrCodes())
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
      setBulkExcelLoader(false)
    } finally {
      setBulkExcelLoader(false)
    }
  };
};



// ------------------------------------------ new api functions


export const createQRCode = (payload, setIsLoading = () => { }, callback = () => { }) => {
  return async (dispatch) => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.postForm("/qr-index/qr/create", payload);
      if (response.status === 201) {
        // console.log(response)
        const message = response?.data?.message;
        toast.success(message);
        setIsLoading(false)
        callback(true)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      toast.error(message);
    }
  };
};



export const updateQRCode = (id, payload, setIsLoading = () => { }, callback = () => { }) => {
  return async (dispatch) => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.putForm(`/qr-index/qr/update/${id}`, payload);
      if (response.status === 200) {
        // console.log(response)
        const message = response?.data?.message;
        toast.success(message);
        setIsLoading(false)
        callback(true)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      toast.error(message);
    }
  };
};


export const getQRDataByShortUrl = (shortCode, callback = () => { }, setIsLoading = () => { }) => {
  return async (dispatch) => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get(`/qr-index/qr/r/${shortCode}`);
      if (response.status === 200 || response.status === 304) {
        // console.log(response)
        const message = response?.data?.message;
        // toast.success(message);
        setIsLoading(false)
        callback(true, response?.data?.data)
      }
    } catch (error) {
      // console.log(error)
      setIsLoading(false)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      toast.error(message);
    }
  };
};


export const getThePDFPrevImage = (imageName, callback = () => { }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/qr-index/files/images/${imageName}`, {
        responseType: 'blob', // Important: Ensure you're expecting a blob response
      });

      if (response.status === 200) {
        // Return the Blob data so it can be handled in the component
        callback(null, response.data);
      }
    } catch (error) {
      console.log(error)
      let message = "Error fetching image";
      if (error?.response) {
        message = error?.response?.data?.message || message;
      }
      callback(error, null);
      toast.error(message);
    }
  };
};


export const getTheVideoFile = (fileName, callback = () => { }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/qr-index/files/videos/${fileName}`, {
        responseType: 'blob', // Important: Ensure you're expecting a blob response
      });

      if (response.status === 200) {
        // Return the Blob data so it can be handled in the component
        callback(null, response.data);
      }
    } catch (error) {
      console.log(error)
      let message = "Error fetching image";
      if (error?.response) {
        message = error?.response?.data?.message || message;
      }
      callback(error, null);
      toast.error(message);
    }
  };
};


export const getTheAudioFile = (fileName, callback = () => { }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/qr-index/files/audios/${fileName}`, {
        responseType: 'blob',
      });

      if (response.status >= 200 && response.status < 300) {
        callback(null, response.data);
      } else {
        callback(new Error(`Unexpected status: ${response.status}`), null);
      }
    } catch (error) {
      
      // ✅ Parse blob error response into readable text
      if (error?.response?.data instanceof Blob) {
        try {
          const errorText = await error.response.data.text();
          let readableMessage = errorText;

          // Try to parse as JSON for structured error messages
          try {
            const parsed = JSON.parse(errorText);
            readableMessage = parsed?.message || parsed?.error || errorText;
            console.error("Audio API Error (parsed):", parsed);
          } catch {
            console.error("Audio API Error (raw text):", errorText);
          }

          toast.error(readableMessage || "Audio not found");
          callback(new Error(readableMessage), null);

        } catch (blobParseError) {
          console.error("Failed to parse blob error:", blobParseError);
          toast.error("Audio not found");
          callback(error, null);
        }

      } else {
        // Normal non-blob error (network error, CORS, etc.)
        const message = error?.response?.data?.message || error?.message || "Audio not found";
        console.error("Audio API Error:", message);
        toast.error(message);
        callback(error, null);
      }
    }
  };
};

export const getThePDFFile = (imageName, callback = () => { }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/qr-index/files/pdfs/${imageName}`, {
        responseType: 'blob', // Important: Ensure you're expecting a blob response
      });

      if (response.status === 200) {
        // Return the Blob data so it can be handled in the component
        callback(null, response.data);
      }
    } catch (error) {
      console.log(error)
      let message = "Error fetching image";
      if (error?.response) {
        message = error?.response?.data?.message || message;
      }
      callback(error, null);
      toast.error(message);
    }
  };
};
