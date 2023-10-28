import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice = createSlice({
    name: "trainerName",
    initialState: localStorage.getItem("trainerName") ?? "",
    reducers: {
        setTrainerName: (state, action) => {
            const newTrainerName = action.payload;
            localStorage.setItem("trainerName", newTrainerName)
            return newTrainerName;
        },
    },
});

export const { setTrainerName } = trainerNameSlice.actions;

export default trainerNameSlice.reducer; 