import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// export const getPosts: any = createAsyncThunk('posts/getPosts', async () => {
//    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
//    return data;
// });

export const getData = createAsyncThunk<{ value: number }>('home/getData', () => {
   return { value: 5 };
});
