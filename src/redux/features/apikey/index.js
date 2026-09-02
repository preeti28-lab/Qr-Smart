import createAxiosInstance from "../../../config/axiosConfig";
import { toast } from "react-toastify";

// ─── Generate a new API Key ────────────────────────────────────────────────
// POST /api-keys/generate
// Auth: Bearer JWT
// Body: { name: string }
// Response 201: { success, message, data: { id, name, key, prefix, isActive, createdAt } }
// key is returned ONE TIME ONLY — frontend shows it in modal immediately
export const generateApiKey = (payload, callback = () => {}) => {
  return async (dispatch) => {
    try {
      const axiosInstance = createAxiosInstance(dispatch);
      const response = await axiosInstance.post("/api-keys/generate", payload);
      if (response.status === 201) {
        callback(true, response.data.data);
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to generate API key";
      toast.error(msg);
      callback(false, null);
    }
  };
};

// ─── Get all API Keys for logged-in user ──────────────────────────────────
// GET /api-keys
// Auth: Bearer JWT
// Response 200: { success, data: { keys: [...], activeCount, maxAllowed } }
// hashedKey is NEVER returned — only prefix and metadata
export const getAllApiKeys = (callback = () => {}) => {
  return async (dispatch) => {
    try {
      const axiosInstance = createAxiosInstance(dispatch);
      const response = await axiosInstance.get("/api-keys");
      if (response.status === 200) {
        callback(true, response.data.data);
        // response.data.data = {
        //   keys: [{ _id, userId, name, prefix, isActive, lastUsedAt,
        //            dailyRequests, dailyRequestsDate, monthlyRequests,
        //            totalRequests, createdAt, updatedAt }],
        //   activeCount: number,
        //   maxAllowed: number
        // }
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to fetch API keys";
      toast.error(msg);
      callback(false, null);
    }
  };
};

// ─── Revoke an API Key by ID ──────────────────────────────────────────────
// PATCH /api-keys/:id/revoke
// Auth: Bearer JWT
// No request body needed
// Response 200: { success, message, data: { _id, name, prefix, isActive: false, ... } }
// Key document is NOT deleted — soft delete only (isActive = false)
export const revokeApiKey = (keyId, callback = () => {}) => {
  return async (dispatch) => {
    try {
      const axiosInstance = createAxiosInstance(dispatch);
      const response = await axiosInstance.patch(`/api-keys/${keyId}/revoke`);
      if (response.status === 200) {
        callback(true, response.data.data);
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to revoke API key";
      toast.error(msg);
      callback(false, null);
    }
  };
};