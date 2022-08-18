import {createSlice} from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:"user",
    initialState:{
        socket:null
    },reducers:{
        update:(state,action)=>{
            state.socket=action.payload.socket;
        },
    }
});
export const {update}=userSlice.actions;
export default userSlice.reducer;
