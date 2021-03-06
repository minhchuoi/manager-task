import { createSlice } from '@reduxjs/toolkit';
import { getData } from './thunk';

interface InitialState {
   dataWork: {
      idProduct: string;
      phase: string;
      employe: string;
      productLot: string;
      targetTime: string;
      mediumTime: string;
   };
   passData: {
      idProduct: string;
      phase: string;
      employe: string;
      productLot: string;
      mediumTime: string;
      timeLive: string;
      time: string;
      process: string;
   };
}

const initialState: InitialState = {
   dataWork: {
      idProduct: '',
      phase: '',
      employe: '',
      productLot: '',
      targetTime: '',
      mediumTime: '',
   },
   passData: {
      idProduct: '',
      phase: '',
      employe: '',
      productLot: '',
      mediumTime: '',
      timeLive: '',
      time: '',
      process: '',
   },
};

export const stopWatchSlice = createSlice({
   name: 'stopWatch',
   initialState,
   reducers: {
      addDataWork: (state, action) => {
         // console.log(action.payload);
         return {
            ...state,
            dataWork: action.payload,
         };
      },
      addPassData: (state, action) => {
         console.log(action.payload);
         return {
            ...state,
            passData: action.payload,
         };
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getData.fulfilled, (state, action) => ({
         ...state,
         value: action.payload.value,
      }));
   },
});

export default stopWatchSlice.reducer;
export const { addDataWork, addPassData } = stopWatchSlice.actions;
