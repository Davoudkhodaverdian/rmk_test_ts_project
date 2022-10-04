import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
}

const currentPersonSlice = createSlice({
    name: "currentPerson",
    initialState: initialState,
    reducers: {
        setCurrentPerson: (state, action: PayloadAction<{firstName: string,lastName: string,}>) => {
            state = action.payload;
            return state;
        },

    }
})

export const { setCurrentPerson } = currentPersonSlice.actions;

export default currentPersonSlice.reducer;