import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",

    initialState: {
        count: 0,   
        count2: 0,  
    },

    reducers: {
        incrementer: (state) => {
            state.count += 1;  
        },
        incrementer2: (state) => {
            state.count2 += 1; 
        },
    }
});

export const { incrementer, incrementer2 } = counterSlice.actions;
export default counterSlice.reducer;
