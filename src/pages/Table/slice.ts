import { createSlice } from '@reduxjs/toolkit';
// import { getData } from './thunk';

interface InitialState {
   workResult: {
      date: string;
      productId: string;
      phases: string;
      user: string;
      productLot: string;
      process: string;
      workTime: string;
   }[];
   productLot: {
      productID: string;
      check: string;
      pack: string;
      send: string;
   }[];
}

const initialState: InitialState = {
   workResult: [
      {
         date: '2021.3.3',
         productId: 'PD1',
         phases: 'Kiem Tra',
         user: 'Minh',
         productLot: '1256',
         process: '10',
         workTime: '15',
      },
      {
         date: '2021.3.4',
         productId: 'PD2',
         phases: 'Dong Goi',
         user: 'Nam',
         productLot: '1256',
         process: '2',
         workTime: '15',
      },
      {
         date: '2021.3.2',
         productId: 'PD2',
         phases: 'Kiem Tra',
         user: 'Dong',
         productLot: '1256',
         process: '10',
         workTime: '20',
      },
      {
         date: '2021.4.3',
         productId: 'PD1',
         phases: 'Kiem Tra',
         user: 'Giang',
         productLot: '1256',
         process: '10',
         workTime: '18',
      },
      {
         date: '2021.3.1',
         productId: 'PD3',
         phases: 'Dong Goi',
         user: 'Tuan',
         productLot: '1256',
         process: '3',
         workTime: '15',
      },
      {
         date: '2021.3.1',
         productId: 'PD3',
         phases: 'Dong Goi',
         user: 'Thang',
         productLot: '1254',
         process: '3',
         workTime: '15',
      },
      {
         date: '2021.3.1',
         productId: 'PD3',
         phases: 'Dong Goi',
         user: 'Linh',
         productLot: '1254',
         process: '3',
         workTime: '25',
      },
      {
         date: '2021.3.1',
         productId: 'PD3',
         phases: 'Dong Goi',
         user: 'Son',
         productLot: '1235',
         process: '3',
         workTime: '15',
      },
   ],
   productLot: [
      {
         productID: '12-34',
         check: '12',
         pack: '5',
         send: '8',
      },
      {
         productID: '12-45',
         check: '4',
         pack: '7',
         send: '2',
      },
      {
         productID: '12-78',
         check: '10',
         pack: '4',
         send: '18',
      },
      {
         productID: '12-48',
         check: '2',
         pack: '8',
         send: '2',
      },
   ],
};

export const tableSlice = createSlice({
   name: 'home',
   initialState,
   reducers: {},
});

export default tableSlice.reducer;
export const {} = tableSlice.actions;
