import { configureStore } from '@reduxjs/toolkit';
import stopWatchReducer from '../pages/StopWatch/slice';
import homeReducer from '../pages/Home/slice';

export const store = configureStore({
   reducer: {
      home: homeReducer,
      stopWatch: stopWatchReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
