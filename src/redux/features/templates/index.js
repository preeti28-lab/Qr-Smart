import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const initialState = {
    allTemplates: [],
    currentTemplate: null,
    isTemplateLoading: false,
};

const axiosInstance = createAxiosInstance();

const templateSlice = createSlice({
    name: "templateDetails",
    initialState,
    reducers: {
        setTemplates: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setTemplates } = templateSlice.actions;
export default templateSlice.reducer;

// ── Helper: build payload matching backend schema ──────────────────────────────
export const buildTemplatePayload = (name, style) => ({
    name,
    style: {
        selectedFrame:                  style.selectedFrame                  ?? "",
        selectedShape:                  style.selectedShape                  ?? "square",
        isCodeStyle:                    style.isCodeStyle                    ?? "classy",
        isCorner:                       style.isCorner                       ?? "dot",
        isCenterStyle:                  style.isCenterStyle                  ?? "dot",
        isCodeStyleBorderColor:         style.isCodeStyleBorderColor         ?? "#000000",
        isCodeStyleDotColor:            style.isCodeStyleDotColor            ?? "#000000",
        isCodeStyleCenterColor:         style.isCodeStyleCenterColor         ?? "#000000",
        isCodeStyleBackgroundColor:     style.isCodeStyleBackgroundColor     ?? "#ffffff",
        selectedLogo:                   style.selectedLogo                   ?? null,
        selectedLevel:                  style.selectedLevel                  ?? "M",
        image:                          style.image                          ?? "",
        logoPreset:                     style.logoPreset                     ?? "logo4",
        corners: {
            dotColor:    style.corners?.dotColor    ?? "#000000",
            dotStyle:    style.corners?.dotStyle    ?? "default",
            squareColor: style.corners?.squareColor ?? "#000000",
            squareStyle: style.corners?.squareStyle ?? "square",
        },
        frame: {
            id:          style.frame?.id            ?? null,
            text:        style.frame?.text          ?? "Scan me!",
            textColor:   style.frame?.textColor     ?? "#000000",
            fontSize:    style.frame?.fontSize      ?? 100,
            color: {
                type:        style.frame?.color?.type       ?? "solid",
                rotation:    style.frame?.color?.rotation   ?? 0,
                colorStops:  style.frame?.color?.colorStops ?? [{ offset: 0, color: "#000000" }],
            },
            backgroundColor: {
                type:        style.frame?.backgroundColor?.type       ?? "solid",
                rotation:    style.frame?.backgroundColor?.rotation   ?? 0,
                colorStops:  style.frame?.backgroundColor?.colorStops ?? [{ offset: 0, color: "#ffffff" }],
            },
        },
        shape: {
            dotsStyle:       style.shape?.dotsStyle       ?? "classy",
            backgroundColor: style.shape?.backgroundColor ?? "transparent",
            color: {
                type:       style.shape?.color?.type       ?? "solid",
                rotation:   style.shape?.color?.rotation   ?? 0,
                colorStops: style.shape?.color?.colorStops ?? [{ offset: 0, color: "#000000" }],
            },
        },
    },
});

// ── CREATE ─────────────────────────────────────────────────────────────────────
export const createTemplate = (name, style) => async (dispatch) => {
    dispatch(setTemplates({ isTemplateLoading: true }));
    try {
        const payload = buildTemplatePayload(name, style);
        const response = await axiosInstance.post("/qr-template/create", payload);
        if (response.status === 200 || response.status === 201) {
            toast.success(response.data?.message || "Template created successfully!");
            dispatch(getAllTemplates());
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to create template");
    } finally {
        dispatch(setTemplates({ isTemplateLoading: false }));
    }
};

// ── GET ALL ────────────────────────────────────────────────────────────────────
export const getAllTemplates = () => async (dispatch) => {
    dispatch(setTemplates({ isTemplateLoading: true }));
    try {
        const response = await axiosInstance.get("/qr-template/all");
        if (response.status === 200) {
            dispatch(setTemplates({ allTemplates: response.data?.templates || response.data || [] }));
        }
    } catch (error) {
        console.error("getAllTemplates", error);
    } finally {
        dispatch(setTemplates({ isTemplateLoading: false }));
    }
};

// ── GET SINGLE ────────────────────────────────────────────────────────────────
export const getTemplateById = (id) => async (dispatch) => {
    dispatch(setTemplates({ isTemplateLoading: true, currentTemplate: null }));
    try {
        const response = await axiosInstance.get(`/qr-template/get/${id}`);
        if (response.status === 200) {
            dispatch(setTemplates({ currentTemplate: response.data?.template || response.data }));
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch template");
    } finally {
        dispatch(setTemplates({ isTemplateLoading: false }));
    }
};

// ── UPDATE ────────────────────────────────────────────────────────────────────
export const updateTemplate = (id, name, style) => async (dispatch) => {
    dispatch(setTemplates({ isTemplateLoading: true }));
    try {
        const payload = buildTemplatePayload(name, style);
        const response = await axiosInstance.put(`/qr-template/update/${id}`, payload);
        if (response.status === 200) {
            toast.success(response.data?.message || "Template updated successfully!");
            dispatch(getAllTemplates());
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to update template");
    } finally {
        dispatch(setTemplates({ isTemplateLoading: false }));
    }
};

// ── DELETE ────────────────────────────────────────────────────────────────────
export const deleteTemplate = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(`/qr-template/delete/${id}`);
        if (response.status === 200) {
            toast.success(response.data?.message || "Template deleted successfully!");
            dispatch(getAllTemplates());
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to delete template");
    }
};