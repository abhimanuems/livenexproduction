import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null,
};

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setFbRTMPURL: (state, action) => {
      state.userDetails = {...state.userDetails,fbRTMPURL :action.payload};
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    setyoutubeRTMPURL :(state,action)=>{
      state.userDetails= {...state.userDetails,youTubeRTMP :action.payload};
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    clearRTMPURLS:(state)=>{
      state.userDetails= null;
      localStorage.removeItem("userDetails");
    }
  },
});

export const { setFbRTMPURL, setyoutubeRTMPURL, clearRTMPURLS } = userDetails.actions;
export default userDetails.reducer;
