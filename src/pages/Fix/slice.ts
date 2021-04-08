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
};

export const stopWatchSlice = createSlice({
   name: 'stopWatch',
   initialState,
   reducers: {
      addDataWork: (state, action) => {
         console.log(action.payload);
         return {
            ...state,
            dataWork: action.payload,
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
export const {} = stopWatchSlice.actions;
