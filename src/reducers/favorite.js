import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorite",

    initialState: {
        length: 0,
    },

    reducers: {
        favoriteAction: (state, action) => {
            state.length = action.payload;
        },
        favoriteEmpty: (state, action) => {
            state.length = 0
        }
    }
})

export const { favoriteAction, favoriteEmpty } = favoriteSlice.actions;

export default favoriteSlice.reducer;