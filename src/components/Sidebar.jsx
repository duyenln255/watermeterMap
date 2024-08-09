import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/Sidebar.css';

const Sidebar = ({ selectedArea, setSelectedArea }) => {
  const allRegions = [
    { label: 'Thành phố Hồ Chí Minh', value: 'Thành phố Hồ Chí Minh' },
    { label: 'Thành phố Thủ Đức', value: 'Thành phố Thủ Đức' },
    { label: 'Quận 1', value: 'Quận 1' },
    { label: 'Quận 3', value: 'Quận 3' },
    { label: 'Quận 4', value: 'Quận 4' },
    { label: 'Quận 5', value: 'Quận 5' },
    { label: 'Quận 6', value: 'Quận 6' },
    { label: 'Quận 7', value: 'Quận 7' },
    { label: 'Quận 8', value: 'Quận 8' },
    { label: 'Quận 10', value: 'Quận 10' },
    { label: 'Quận 11', value: 'Quận 11' },
    { label: 'Quận 12', value: 'Quận 12' },
    { label: 'Quận Bình Tân', value: 'Quận Bình Tân' },
    { label: 'Quận Bình Thạnh', value: 'Quận Bình Thạnh' },
    { label: 'Quận Gò Vấp', value: 'Quận Gò Vấp' },
    { label: 'Quận Phú Nhuận', value: 'Quận Phú Nhuận' },
    { label: 'Quận Tân Bình', value: 'Quận Tân Bình' },
    { label: 'Quận Tân Phú', value: 'Quận Tân Phú' },
    { label: 'Huyện Bình Chánh', value: 'Huyện Bình Chánh' },
    { label: 'Huyện Cần Giờ', value: 'Huyện Cần Giờ' },
    { label: 'Huyện Củ Chi', value: 'Huyện Củ Chi' },
    { label: 'Huyện Hóc Môn', value: 'Huyện Hóc Môn' },
    { label: 'Huyện Nhà Bè', value: 'Huyện Nhà Bè' }
  ];

  const [selectedRegions, setSelectedRegions] = useState(null);

  const onRegionChange = (e) => {
    setSelectedRegions(e.value);
    setSelectedArea(e.value); // Cập nhật vùng được chọn
  };

  useEffect(() => {
    setSelectedRegions(selectedArea);
  }, [selectedArea]);

  const [selectedCrops, setSelectedCrops] = useState([]);
  const cropOptions = [
    { label: 'Long Nhãn', value: 'Long Nhãn' },
    // Thêm các loại cây khác nếu cần
  ];

  const waterMeterData = [
    {
      area: 'Quận 1',
      type: 'Loại 1',
      owner: 'Nguyễn Văn A',
      meterId: '1522',
      serial: '123456',
      yearProduction: '8528.64',
      currentProduction: '180',
    },
    {
      area: 'Quận 1',
      type: 'Loại 1',
      owner: 'Nguyễn Văn AA',
      meterId: '15222',
      serial: '1234526',
      yearProduction: '8528.264',
      currentProduction: '1280',
    },
    {
      area: 'Quận 3',
      type: 'Loại 2',
      owner: 'Nguyễn Văn B',
      meterId: '1523',
      serial: '123457',
      yearProduction: '7300.50',
      currentProduction: '150',
    },
    {
      area: 'Quận 4',
      type: 'Loại 1',
      owner: 'Nguyễn Văn C',
      meterId: '1524',
      serial: '123458',
      yearProduction: '6520.70',
      currentProduction: '200',
    },
    {
      area: 'Quận 5',
      type: 'Loại 2',
      owner: 'Nguyễn Văn D',
      meterId: '1525',
      serial: '123459',
      yearProduction: '7800.20',
      currentProduction: '170',
    },
    {
      area: 'Quận Tân Bình',
      type: 'Loại 2',
      owner: 'Nguyễn Văn A',
      meterId: '1522',
      serial: '123456',
      yearProduction: '8528.64',
      currentProduction: '180',
    },
    {
      area: 'Quận Tân Phú',
      type: 'Loại 3',
      owner: 'Nguyễn Văn AA',
      meterId: '15222',
      serial: '1234526',
      yearProduction: '8528.264',
      currentProduction: '1280',
    },  ];

    // Lọc dữ liệu đồng hồ nước theo khu vực được chọn
    const selectedWaterMeterData = selectedArea === 'Thành phố Hồ Chí Minh' 
    ? waterMeterData 
    : waterMeterData.filter(data => data.area === selectedArea);
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/src/assets/water-meter-2.svg" alt="Logo" className="logo-svg" />
        <h1>Đồng Hồ Nước TP Hồ Chí Minh</h1>
      </div>
      <div className="select-container">
        <label>Khu vực</label>
        <Dropdown 
          value={selectedRegions} 
          options={allRegions} 
          onChange={onRegionChange}
          placeholder="Chọn khu vực"
          className="w-full"
        />
      </div>
      <div className="multiselect-container">
        <label>Đồng hồ nước</label>
        <MultiSelect
          value={selectedCrops}
          options={cropOptions}
          onChange={(e) => setSelectedCrops(e.value)}
          placeholder="Chọn loại đồng hồ nước cần lọc"
          className="w-full p-multiselect"
        />
      </div>
      <h2 className="info-header">Thông tin đồng hồ nước</h2>
      <div className="scrollable-content">
        {selectedWaterMeterData.length > 0 ? (
          selectedWaterMeterData.map((data, index) => (
            <table className="watermeter-table" key={index}>
              <thead>
                <tr>
                  <th colSpan="2">{data.type}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chủ hộ</td>
                  <td>{data.owner}</td>
                </tr>
                <tr>
                  <td>Mã số đồng hồ</td>
                  <td>{data.meterId}</td>
                </tr>
                <tr>
                  <td>Số serial</td>
                  <td>{data.serial}</td>
                </tr>
                <tr>
                  <td>Sản lượng năm (tấn)</td>
                  <td>{data.yearProduction}</td>
                </tr>
                <tr>
                  <td>Sản lượng hiện có (tấn)</td>
                  <td>{data.currentProduction}</td>
                </tr>
              </tbody>
            </table>
          ))
        ) : (
          <p>Không có thông tin đồng hồ nước cho khu vực này.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
