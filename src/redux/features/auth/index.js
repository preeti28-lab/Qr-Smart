// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getItemFromStore, setItemToStore } from "../../../utils";


const initialState = {
  token: getItemFromStore("qrmsart") || null,
  isAuthenticated: !!getItemFromStore("qrmsart"),
  role: (getItemFromStore("qrmsart") && getItemFromStore("role")) || null,
  paidPlan: getItemFromStore("paidPlan") || null,
  trialPlanUsed: getItemFromStore("trialPlanUsed") || null,
  userId: getItemFromStore("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      const { token, isAuthenticated, role, paidPlan, trialPlanUsed ,userId} = action.payload;
      console.log("inside auth slide ", trialPlanUsed)
      state.token = token;
      state.isAuthenticated = isAuthenticated;
      state.role = role;
      state.paidPlan = paidPlan;
      state.trialPlanUsed = trialPlanUsed;
      state.userId = userId;
      


      setItemToStore("qrmsart", token);
      setItemToStore("role", role);
      setItemToStore("isAuthenticated", isAuthenticated);
      // setItemToStore("paidPlan", paidPlan);
      // setItemToStore("trialPlanUsed", trialPlanUsed);
      setItemToStore("userId", userId);
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
