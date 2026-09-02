import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance();
const initialState = {
    createQRLoader: false,
};


const loaderSlice = createSlice({
    name: "loaderDetails",
    initialState,
    reducers: {
        setLoader: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;


