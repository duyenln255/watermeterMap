import { configureStore } from '@reduxjs/toolkit';
import waterMeterReducer from './features/waterMeter/waterMeterSlice'; // Đảm bảo đường dẫn đúng

export const store = configureStore({
  reducer: {
    waterMeter: waterMeterReducer,
  },
});
