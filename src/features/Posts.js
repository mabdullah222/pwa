import { createSlice } from "@reduxjs/toolkit";


export const postSlice=createSlice({
    name:'Posts',
    initialState:{value:[]},
    reducers:{
        setPost:(state,action)=>{
            state.value=action.payload
        },
    }
})


export const {setPost}=postSlice.actions;
export default postSlice.reducer;