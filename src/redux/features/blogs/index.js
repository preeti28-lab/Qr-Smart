import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance();
const initialState = {
    allBlogs: null,
};


const blogSlice = createSlice({
    name: "blogDetails",
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;


export const getAllBlogs = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/blog/getAll", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                // toast.success(message);
                // dispatch(getAllQrCodes())
                dispatch(setBlogs({ allBlogs: response?.data?.reverse() }))
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

export const createBlog = (payload, callback = () => { }, setAddLoader) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/blog/create", payload);
            if (response.status === 201) {
                setAddLoader(false)
                console.log("response is ", response)
                toast.success("Blog Added");
                dispatch(getAllBlogs())
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
            setAddLoader(false)
        } finally {
            setAddLoader(false)
        }
    };
};

export const editBlog = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/blog/create", payload);
            if (response.status === 201) {
                console.log("response is ", response)
                toast.success("Blog Added");
                dispatch(getAllBlogs())
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

export const getSingleBlog = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/blog/getBlogByName", { title: payload });
            if (response.status === 200) {
                console.log("response is ", response)
                callback(true, response?.data)
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
        } finally {

        }
    };
};

export const deleteBlog = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/blog/delete", { id: payload });
            if (response.status === 200) {
                console.log("response is ", response)
                callback(true, response?.data)
                dispatch(getAllBlogs())
                toast.success(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
        } finally {

        }
    };
};

export const getBlogImg = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get(`/blog//getImageFile/${payload}`, {
                responseType: "blob",
            });
            if (response.status === 200) {
                const imageUrl = URL.createObjectURL(response.data); // Convert Blob to URL
                callback(true, imageUrl);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
        } finally {

        }
    };
};


export const getAllPlans = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/qr-plan/plans", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                callback(true, response?.data?.plans)

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



export const getPaymentHistory = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/qr-subscription/my-payment-history", payload);
            if (response.status === 200) {
                // console.log("response is ", response)
                callback(true, response?.data?.history)

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






export const purchasePlan = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/qr-subscription/checkout", payload);
            if (response.status === 200 || response?.status === 201) {
                console.log("response is ", response)
                toast.success(response?.data?.message)
                callback(true, response.data)
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



export const reportAbuse = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/abuse-report/add", payload);
            if (response.status === 201) {
                callback(true)
            }
        } catch (error) {
            console.log(error.response)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
        }
    };
};


export const getAllNotificationsPage = (callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get(
                "/blog/notification/getAll"
            );
            if (response.status === 200) {
                const data =
                    response?.data?.data || response?.data?.notifications || [];
                callback(true, data)

            }
        } catch (error) {
            console.log(error);
            let message = "Error fetching notifications";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            console.error(message);
        }
    };
};

// Get notification by ID (for detail page)
export const getNotificationById = (id, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post(
                "/blog/notification/getById",
                { id }
            );

            if (response.status === 200) {
                const notification =
                    response?.data?.data || response?.data?.notification;
                callback(true, notification);
            }
        } catch (error) {
            console.log(error);
            let message = "Error fetching notification";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
            callback(false, null);
        }
    };
};




export const getNotificationPhotoUrl = (photoPath) => {
    if (!photoPath) return null;

    const API_BASE_URL = "https://m.kcptl.in/procx";

    // photoPath format: "notifications/photos/filename.jpg"
    const parts = photoPath.split("/");

    if (
        parts.length !== 3 ||
        parts[0] !== "notifications" ||
        parts[1] !== "photos"
    ) {
        console.error("❌ Invalid photo path:", photoPath);
        return null;
    }

    const photoName = parts[2];
    return `${API_BASE_URL}/blog/notification/photo/${photoName}`;
};

