import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import AuthState from "../../components/models/authState";

const initialState: AuthState = {
    verifyToken: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<string>) => {
            state.verifyToken = action.payload;
            return state;
        },

    }
})

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;