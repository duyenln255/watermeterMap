// mapUtils.js

// Define specific positions for district labels
export const districtLabelPositions = {
    "Quận 1": { lat: 10.770497, lng: 106.696346 },
    "Quận 3": { lat: 10.784, lng: 106.686 },
    "Quận 4": { lat: 10.757587, lng: 106.704296 },
    "Quận 5": { lat: 10.754449, lng: 106.668835 },
    "Quận 6": { lat: 10.7451, lng: 106.636 },
    "Quận 7": { lat: 10.7354, lng: 106.731 },
    "Quận 8": { lat: 10.7345, lng: 106.648 },
    "Quận 9": { lat: 10.8416, lng: 106.82 },
    "Quận 10": { lat: 10.774, lng: 106.668 },
    "Quận 11": { lat: 10.7647, lng: 106.65 },
    "Quận 12":  {lat: 10.87332, lng: 106.65675},
    "Quận Phú Nhuận": { lat: 10.799919, lng: 106.678528 },
    "Quận Tân Bình":  {lat: 10.8086330, lng: 106.65353},
    "Quận Bình Tân":  {lat: 10.757869, lng: 106.596739},
    "Quận Tân Phú":  {lat: 10.788338, lng: 106.628692},
    "Quận Gò Vấp":  {lat: 10.843243, lng: 106.668931},
    "Quận Bình Thạnh":  {lat: 10.808847, lng: 106.703679},
    "Thành phố Thủ Đức": { lat: 10.82676, lng: 106.801007 },
    "Huyện Bình Chánh": { lat: 10.748564, lng: 106.525429 },
    "Huyện Hóc Môn": { lat: 10.886977, lng: 106.587828 },
    "Huyện Củ Chi":  { lat: 11.0041, lng: 106.51127 },
    "Huyện Cần Giờ":  {lat: 10.5231644387, lng: 106.86516040},
    "Huyện Nhà Bè":  { lat: 10.677350, lng: 106.720262 },
};
export const markers = [
  { id: 1, lat: 10.9744159, lng: 106.4948968, owner: 'Nguyễn Văn F', serial: '123461', meterId: '1527', area: 'Huyện Củ Chi' },
  { id: 2, lat: 10.9997541, lng: 106.54714754, owner: 'Nguyễn Văn G', serial: '123462', meterId: '1528', area: 'Huyện Củ Chi' },
  { id: 3, lat: 10.8860463, lng: 106.6380764, owner: 'Nguyễn Văn H', serial: '123463', meterId: '1529', area: 'Quận 12' },
  { id: 4, lat: 10.763203, lng: 106.691667, owner: 'Nguyễn Văn A', serial: '123456', meterId: '1522', area: 'Quận 1' },
  { id: 5, lat: 10.784030, lng: 106.702225, owner: 'Nguyễn Văn I', serial: '123464', meterId: '1530', area: 'Quận 1' }, 
  { id: 6, lat: 10.7822622, lng: 106.7102172, owner: 'Nguyễn Văn J', serial: '123465', meterId: '1531', area: 'Quận 1' }, 
  { id: 7, lat: 10.7692622, lng: 106.69902172, owner: 'Nguyễn Văn K', serial: '123466', meterId: '1532', area: 'Quận 1' },
  { id: 8, lat: 10.7822622, lng: 106.7102172, owner: 'Nguyễn Văn L', serial: '123467', meterId: '1533', area: 'Quận 1' },
  { id: 9, lat: 10.7692622, lng: 106.7052172, owner: 'Nguyễn Văn M', serial: '123468', meterId: '1534', area: 'Quận 1' },
  { id: 10, lat: 10.7822622, lng: 106.69902172, owner: 'Nguyễn Văn N', serial: '123469', meterId: '1535', area: 'Quận 1' },
  { id: 11, lat: 10.782612, lng: 106.679401, owner: 'Nguyễn Văn B', serial: '123457', meterId: '1523', area: 'Quận 3' },
  { id: 12, lat: 10.782704, lng: 106.693655, owner: 'Nguyễn Văn O', serial: '123470', meterId: '1536', area: 'Quận 3' }, 
  { id: 13, lat: 10.784728, lng: 106.671854, owner: 'Nguyễn Văn P', serial: '123471', meterId: '1537', area: 'Quận 3' }, 
  { id: 14, lat: 10.760243, lng: 106.710347, owner: 'Nguyễn Văn C', serial: '123458', meterId: '1524', area: 'Quận 4' },
  { id: 15, lat: 10.753497, lng: 106.689747, owner: 'Nguyễn Văn Q', serial: '123472', meterId: '1538', area: 'Quận 4' }, 
  { id: 16, lat: 10.752298, lng: 106.656175, owner: 'Nguyễn Văn D', serial: '123459', meterId: '1525', area: 'Quận 5' },
  { id: 17, lat: 10.752129, lng: 106.684843, owner: 'Nguyễn Văn R', serial: '123473', meterId: '1539', area: 'Quận 5' }, 
  { id: 18, lat: 10.752551, lng: 106.668363, owner: 'Nguyễn Văn S', serial: '123474', meterId: '1540', area: 'Quận 5' }, 
  { id: 19, lat: 10.758622, lng: 106.666303, owner: 'Nguyễn Văn T', serial: '123475', meterId: '1541', area: 'Quận 5' },
  { id: 20, lat: 10.784436, lng: 106.665135, owner: 'Nguyễn Văn U', serial: '123476', meterId: '1542', area: 'Quận 10' },
//   { id: 21, lat: 10.4147541, lng: 106.968310, owner: 'Nguyễn Văn E', serial: '123460', meterId: '1526', area: 'Huyện Bình Chánh' },
//   { id: 22, lat: 10.4147541, lng: 106.9714754, owner: 'Nguyễn Văn V', serial: '123477', meterId: '1543', area: 'Huyện Bình Chánh' },
  { id: 23, lat: 10.4147541, lng: 106.9714754, owner: 'Nguyễn Văn W', serial: '123478', meterId: '1544', area: 'Huyện Cần Giờ' },
  { id: 24, lat: 10.837685, lng: 106.843404, owner: 'Nguyễn Văn X', serial: '123479', meterId: '1545', area: 'Thành phố Thủ Đức' },
  { id: 25, lat: 10.762818, lng: 106.758603, owner: 'Nguyễn Văn Y', serial: '123480', meterId: '1546', area: 'Thành phố Thủ Đức' },
  { id: 27, lat: 10.787101, lng: 106.831045, owner: 'Nguyễn Văn Z', serial: '123481', meterId: '1547', area: 'Thành phố Thủ Đức' },
  { id: 28, lat: 10.738483, lng: 106.516209, owner: 'Nguyễn Văn A1', serial: '123482', meterId: '1548', area: 'Huyện Bình Chánh' },
  { id: 29, lat: 10.846225, lng: 106.548932, owner: 'Nguyễn Văn B1', serial: '123483', meterId: '1549', area: 'Huyện Hóc Môn' },
  { id: 30, lat: 10.664521, lng: 106.642483, owner: 'Nguyễn Văn C1', serial: '123484', meterId: '1550', area: 'Huyện Bình Chánh' },
  { id: 34, lat: 10.819007, lng: 106.532620, owner: 'Nguyễn Văn D1', serial: '123485', meterId: '1551', area: 'Huyện Bình Chánh' },
  { id: 35, lat: 10.696909, lng: 106.656903, owner: 'Nguyễn Văn E1', serial: '123486', meterId: '1552', area: 'Huyện Bình Chánh' },
  { id: 36, lat: 10.541010, lng: 106.794073, owner: 'Nguyễn Văn F1', serial: '123487', meterId: '1553', area: 'Huyện Cần Giờ' },
  { id: 37, lat: 10.635504, lng: 106.790640, owner: 'Nguyễn Văn G1', serial: '123488', meterId: '1554', area: 'Huyện Cần Giờ' },
  { id: 38, lat: 10.556536, lng: 106.959554, owner: 'Nguyễn Văn H1', serial: '123489', meterId: '1555', area: 'Huyện Cần Giờ' },
  { id: 39, lat: 10.468771, lng: 106.783773, owner: 'Nguyễn Văn I1', serial: '123490', meterId: '1556', area: 'Huyện Cần Giờ' },
];

export const getCenterOfDistrict = (districtName) => {
    return districtLabelPositions[districtName] || { lat: 10.762622, lng: 106.660172 }; // Giá trị mặc định nếu không tìm thấy
};
  
export const loadGeoJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};


// Hàm để lọc dữ liệu đồng hồ nước theo khu vực đã chọn
export const filterWaterMeterDataByArea = (waterMeterData, selectedArea) => {
    return selectedArea === 'Thành phố Hồ Chí Minh'
        ? waterMeterData
        : waterMeterData.filter(data => data.area === selectedArea);
};
