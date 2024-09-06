import {createSlice} from '@reduxjs/toolkit';
const initialState={
    user:null
};
const userSlice=createSlice(
    {
       name:"user",
       initialState,
       reducers:
       {
          setUserDetail:(state,action)=>
            {    console.log("slicedata",action.payload);
                  state.user=action.payload;
            }
       }
    
    }
);

export default userSlice.reducer;
export const {setUserDetail} = userSlice.actions;

