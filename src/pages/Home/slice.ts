import { createSlice } from '@reduxjs/toolkit';
import { getData } from './thunk';

interface InitialState {
   products: {
      id: string;
      phases: {
         id: string;
         name: string;
         process: string;
         time: string;
      }[];
   }[];
   users: {
      id: string;
      name: string;
   }[];
   passData: {
      idProduct: string;
      phases: string;
      employe: string;
      productLot: string;
   };
   targetTime: {
      id: string;
      name: string;
      process: string;
      time: string;
   };
}

const initialState: InitialState = {
   products: [
      {
         id: 'PD1',
         phases: [
            {
               id: 'P1',
               name: 'Kiem Tra',
               process: '10',
               time: '15',
            },
            {
               id: 'P2',
               name: 'Dong Goi',
               process: '5',
               time: '15',
            },
         ],
      },
      {
         id: 'PD2',
         phases: [
            {
               id: 'P1',
               name: 'Kieaaaa',
               process: '20',
               time: '20',
            },
            {
               id: 'P2',
               name: 'Dong aaaGoi',
               process: '3',
               time: '15',
            },
         ],
      },
      {
         id: 'PD3',
         phases: [
            {
               id: 'P1',
               name: 'Kiem Tra',
               process: '15',
               time: '30',
            },
            {
               id: 'P2',
               name: 'Dong Goi',
               process: '4',
               time: '20',
            },
         ],
      },
   ],
   users: [
      {
         id: 'U1',
         name: 'Minh',
      },
      { id: 'U2', name: 'Nam' },
      {
         id: 'U3',
         name: 'bac',
      },
   ],
   passData: {
      idProduct: '',
      phases: '',
      employe: '',
      productLot: '',
   },
   targetTime: {
      id: 'P1',
      name: '',
      process: '',
      time: '',
   },
};

export const homeSlice = createSlice({
   name: 'home',
   initialState,
   reducers: {
      addUser: (state, action) => {
         return {
            ...state,
            passData: action.payload,
         };
      },
      addTime: (state, action) => {
         console.log(action.payload);
         return {
            ...state,
            targetTime: action.payload,
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

export default homeSlice.reducer;
export const { addUser, addTime } = homeSlice.actions;
