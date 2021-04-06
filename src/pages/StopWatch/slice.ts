import { createSlice } from '@reduxjs/toolkit';
import { getData } from './thunk';

interface InitialState {
   idProduct: string[];
   phases: string[];
}

const initialState: InitialState = {
   idProduct: ['id1', 'id2', 'id3', 'id4'],
   phases: ['phases1', 'phases2', 'phases3', 'phases4'],
};

export const stopWatchSlice = createSlice({
   name: 'stopWatch',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getData.fulfilled, (state, action) => ({
         ...state,
         value: action.payload.value,
      }));
   },
});

export default stopWatchSlice.reducer;
export const {} = stopWatchSlice.actions;
