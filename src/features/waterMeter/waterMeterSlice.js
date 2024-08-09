import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meters: [
    { id: 1, name: 'Xoài Tượng Da Xanh', area: 17, households: 35, annualYield: 204, currentYield: 28, lat: 10.35, lng: 105.43 },
    { id: 2, name: 'Lúa', area: 55.9, households: 40, annualYield: 204, currentYield: 0, lat: 10.36, lng: 105.44 },
    { id: 3, name: 'Mít', area: 14.8, households: 39, annualYield: 325.6, currentYield: 0, lat: 10.37, lng: 105.45 }
    // Thêm dữ liệu đồng hồ nước vào đây
  ],
};

export const waterMeterSlice = createSlice({
  name: 'waterMeter',
  initialState,
  reducers: {
    setMeters: (state, action) => {
      state.meters = action.payload;
    },
  },
});

export const { setMeters } = waterMeterSlice.actions;

export default waterMeterSlice.reducer;
