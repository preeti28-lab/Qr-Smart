import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebar: false,
    mobileFrame: null,
}

const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        setAction: (state, { payload }) => {
            Object.keys(payload).forEach((item) => {
                state[item] = payload[item];
            })
        }
    }
});

export const { setAction } = actionSlice.actions;
export default actionSlice.reducer;

// functions
