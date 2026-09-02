import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { setToken } from "../auth";
import { setUser } from "../user";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../loaders";

const axiosInstance = createAxiosInstance();

const initialState = {
  allUsers: null,
  allLeads: null,
  highPriorityLeads: null,
  leadsByLastWeek: null,
  allLeadsSummary: null,
  executiveSummary: null,
  executive: null,
  managers: null,
  websiteUrl: null,
  qrType: null,
  qrName: null,
  textQrName: null,
  imageQrName: null,
  videoQrName: null,
  pdfQrName: null,
  vcQrName: null,
  vCardDetails: null, // Added vCardDetails to state
  timeRange: null,
  qrImage: null,
  qrBlob: null,
  uploadedPdf: null,
  textForQR: null,
  imagesForQr: null,
  dummyTextForQr: null,
  dummyVcDetails: null,
  lastPage: null,
};


const dashboardSlice = createSlice({
  name: "dashboardDetails",
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setWebsiteUrl: (state, action) => {
      state.websiteUrl = action.payload; // Update websiteUrl with the payload value
    },
    setVCardDetails: (state, action) => {
      state.vCardDetails = action.payload; // Update vCardDetails with the payload value
    },
    setQrType: (state, action) => {
      state.qrType = action.payload; // Update vCardDetails with the payload value
    },
    setQrName: (state, action) => {
      state.qrName = action.payload; // Update vCardDetails with the payload value
    },
    setTextQrName: (state, action) => {
      state.textQrName = action.payload; // Update vCardDetails with the payload value
    },
    setPdfQrName: (state, action) => {
      state.pdfQrName = action.payload; // Update vCardDetails with the payload value
    },
    setVideoQrName: (state, action) => {
      state.videoQrName = action.payload; // Update vCardDetails with the payload value
    },
    setVCQrName: (state, action) => {
      state.vcQrName = action.payload; // Update vCardDetails with the payload value
    },
    setImageQrName: (state, action) => {
      state.imageQrName = action.payload; // Update vCardDetails with the payload value
    },
    setTime: (state, action) => {
      state.timeRange = action.payload; // Update vCardDetails with the payload value
    },
    setQRImage: (state, action) => {
      state.qrImage = action.payload; // Update the stored QR code image
    },
    setQRBlob: (state, action) => {
      state.qrBlob = action.payload; // Update the stored QR code image
    },
    setUploadedPdf: (state, action) => {
      state.uploadedPdf = action.payload; // Update the stored QR code image
    },
    setTextForQR: (state, action) => {
      state.textForQR = action.payload; // Update the stored QR code image
    },
    setImagesForQR: (state, action) => {
      state.imagesForQr = action.payload; // Update the stored QR code image
    },
    setDummyTextForQr: (state, action) => {
      state.dummyTextForQr = action.payload; // Update the stored QR code image
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload; // Update the stored QR code image
    },
    setDummyVCDetails: (state, action) => {
      state.dummyVcDetails = {
        ...state.dummyVcDetails,
        ...action.payload, // Merge new details with existing ones
      };
    },
  },
});

export const { setDashboard, setLastPage, setTextQrName, setPdfQrName, setVCQrName, setImageQrName, setVideoQrName, setDummyVCDetails, setDummyTextForQr, setWebsiteUrl, setVCardDetails, setQrType, setQrName, setTime, setQRImage, setQRBlob, setUploadedPdf, setTextForQR, setImagesForQR } = dashboardSlice.actions;
export default dashboardSlice.reducer;

export const getAllTeamMembers = () => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.get("/user/getAll",);
      if (response.status === 200) {
        console.log("response is ", response)
        const data = response?.data;
        // callback(null);

        // dispatch(setTeamMembers({ allUsers: data }))
        // dispatch(getAllLeads());
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

export const getShortLink = () => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.get("/new/provideShortLink",);
      if (response.status === 200) {
        console.log("response is ", response)
        const data = response?.data;
        dispatch(setDashboard({ shortlink: data }))
        // callback(null);

        // dispatch(setTeamMembers({ allUsers: data }))
        // dispatch(getAllLeads());
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);

    } finally {

    }
  };
};




export const createQr = ({ formData, callback = () => { } }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ createQRLoader: true }))
      const response = await axiosInstance.postForm("/new/create", formData);
      if (response.status === 201) {
        console.log("response is ", response)
        const message = response.data?.message || "Created successfully!";
        if (callback) {
          callback(null, response.data);
        }

        toast.success(message);
        dispatch(setLoader({ createQRLoader: false }))
        // dispatch(getAllLeads());
      }
    } catch (error) {
      console.log(error)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // Call the callback with an error
      if (callback) {
        callback(error, null);
      }
      dispatch(setLoader({ createQRLoader: false }))
    } finally {
      dispatch(setLoader({ createQRLoader: false }))
    }
  };
};

// buy paid plan 
export const buyPaidPlan = (payload) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.post("/user/buyPaidPlan", payload);
      if (response.status === 200) {
        console.log("response is ", response)
        const message = response?.data.message;
        const token = response.data.token;
        if (token) {

          const user = jwtDecode(token);
          console.log("user", user);
          const role = user.foundUser.profile;
          const paidPlan = user.foundUser.paidPlan;
          const trialPlanUsed = user.foundUser.trialPlanUsed;
          const userId = user.foundUser._id;
          console.log("tdsf", trialPlanUsed)
          const userData = user.foundUser;
          const abilityUser = user.foundUser;
          const ability = {
            departments: abilityUser?.userDepartment,
            profile: abilityUser?.profile,
          };
          console.log(userData);

          dispatch(
            setToken({
              token,
              isAuthenticated: true,
              role: user.foundUser.profile ? user.foundUser.profile : null,
              ability: ability,
              paidPlan: paidPlan,
              trialPlanUsed: trialPlanUsed,
              userId: userId,
            })
          );
          toast.success(message, {
            position: "top-right",
            autoClose: 2000,
          });

          dispatch(setUser({ userData }));
        }

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


export const buyTrialPlan = (payload) => {
  return async (dispatch) => {
    try {

      const response = await axiosInstance.post("/user/buyTrialPlan", payload);
      console.log(response)
      if (response.status === 200) {
        console.log("response is ", response)
        const message = response?.data.message;
        const token = response.data.token;
        if (token) {

          const user = jwtDecode(token);
          console.log("user", user);
          const role = user.foundUser.profile;
          const paidPlan = user.foundUser.paidPlan;
          const trialPlanUsed = user.foundUser.trialPlanUsed;
          const userId = user.foundUser._id;
          console.log("tdsf", trialPlanUsed)
          const userData = user.foundUser;
          const abilityUser = user.foundUser;
          const ability = {
            departments: abilityUser?.userDepartment,
            profile: abilityUser?.profile,
          };
          console.log(userData);

          dispatch(
            setToken({
              token,
              isAuthenticated: true,
              role: user.foundUser.profile ? user.foundUser.profile : null,
              ability: ability,
              paidPlan: paidPlan,
              trialPlanUsed: trialPlanUsed,
              userId: userId,
            })
          );
          toast.success(message, {
            position: "top-right",
            autoClose: 2000,
          });

          dispatch(setUser({ userData }));
        }

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


export const downlodTermsPDF = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/pdf/termscondition`, {
        responseType: 'blob', // Important: Ensure you're expecting a blob response
      });

      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Qrsmart_Terms_Contract.pdf';
        link.target = "_blank";
        document.body.appendChild(link); // Append link to body
        link.click(); // Programmatically click the link to trigger download
        document.body.removeChild(link); // Remove link from body
        URL.revokeObjectURL(url); // Clean up the Blob URL
      }
    } catch (error) {
      let message = 'Error downloading PDF';
      if (error?.response) {
        message = error?.response?.data?.message || message;
      }
      toast.error(message);
    }
  };
};

export const downlodPrivacyPDF = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/pdf/privacypolicy`, {
        responseType: 'blob', // Important: Ensure you're expecting a blob response
      });

      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Privacy_Policy_QRSmart.pdf';
        link.target = "_blank";
        document.body.appendChild(link); // Append link to body
        link.click(); // Programmatically click the link to trigger download
        document.body.removeChild(link); // Remove link from body
        URL.revokeObjectURL(url); // Clean up the Blob URL
      }
    } catch (error) {
      let message = 'Error downloading PDF';
      if (error?.response) {
        message = error?.response?.data?.message || message;
      }
      toast.error(message);
    }
  };
};





export const postContactEnquiry = (payload, callback = () => { }) => {
  return async (dispatch) => {
    try {
      // dispatch(setLoader({ createQRLoader: true }))
      const response = await axiosInstance.post("/contact/add", payload);
      if (response.status === 201 || response.status === 200) {
        // console.log("response is ", response)
        const message = response.data?.message || "Created successfully!";
        callback(true)
        toast.success(message);
      }
    } catch (error) {
      console.log(error.response)
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      toast.error(message)

    }
  };
};