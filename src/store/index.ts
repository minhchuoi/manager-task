import { configureStore } from '@reduxjs/toolkit';
import stopWatchReducer from '../pages/StopWatch/slice';
import homeReducer from '../pages/Home/slice';
import tableReducer from '../pages/Table/slice';

export const store = configureStore({
   reducer: {
      home: homeReducer,
      stopWatch: stopWatchReducer,
      table: tableReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
