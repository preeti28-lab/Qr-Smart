import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance();
const initialState = {
    allContacts: null,
    allMembers: null,
};


const contactSlice = createSlice({
    name: "contactDetails",
    initialState,
    reducers: {
        setContact: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setContact } = contactSlice.actions;
export default contactSlice.reducer;


export const getAllContacts = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/contact/get/all", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                // toast.success(message);
                // dispatch(getAllQrCodes())
                dispatch(setContact({ allContacts: response?.data?.reverse() }))
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

export const getAllUsers = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/user/get", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                // toast.success(message);
                // dispatch(getAllQrCodes())
                dispatch(setContact({ allMembers: response?.data?.reverse() }))
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