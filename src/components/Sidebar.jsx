import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/Sidebar.css';
import { markers, filterWaterMeterDataByArea } from '../utils/mapUtils';

const Sidebar = ({ selectedArea, setSelectedArea }) => {
    const allRegions = [
        { label: 'Thành phố Hồ Chí Minh', value: 'Thành phố Hồ Chí Minh' },
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
        { label: 'Thành phố Thủ Đức', value: 'Thành phố Thủ Đức' },
        { label: 'Huyện Bình Chánh', value: 'Huyện Bình Chánh' },
        { label: 'Huyện Cần Giờ', value: 'Huyện Cần Giờ' },
        { label: 'Huyện Củ Chi', value: 'Huyện Củ Chi' },
        { label: 'Huyện Hóc Môn', value: 'Huyện Hóc Môn' },
        { label: 'Huyện Nhà Bè', value: 'Huyện Nhà Bè' }
    ];

    const [selectedRegionData, setSelectedRegionData] = useState({
        selectedRegion: null,
        waterMeterData: []
    });

    const onRegionChange = (e) => {
        const newSelectedRegion = e.value;
        const filteredData = filterWaterMeterDataByArea(markers, newSelectedRegion);
        
        setSelectedRegionData({
            selectedRegion: newSelectedRegion,
            waterMeterData: filteredData
        });
        setSelectedArea(newSelectedRegion); // Cập nhật vùng được chọn
    };

    useEffect(() => {
        setSelectedRegionData(prevState => ({
            ...prevState,
            selectedRegion: selectedArea,
            waterMeterData: filterWaterMeterDataByArea(markers, selectedArea)
        }));
    }, [selectedArea]);

    const totalWaterMeters = selectedRegionData.waterMeterData.length;

    return (
        <div className="sidebar">
            <div className="logo">
                <img src="/src/assets/water-meter-2.svg" alt="Logo" className="logo-svg" />
                <h1>Đồng Hồ Nước TP Hồ Chí Minh</h1>
            </div>
            <div className="select-container">
                <label>Khu vực</label>
                <Dropdown 
                    value={selectedRegionData.selectedRegion} 
                    options={allRegions} 
                    onChange={onRegionChange}
                    placeholder="Chọn khu vực"
                    className="w-full"
                />
            </div>
            <h2 className="info-header">Thông tin đồng hồ nước</h2>
            <div className="scrollable-content">
                {selectedRegionData.waterMeterData.length > 0 ? (
                    <div>
                        <p className="watermeter-number">Tổng số đồng hồ nước: {totalWaterMeters}</p>
                        {selectedRegionData.waterMeterData.map((data, index) => (
                            <table className="watermeter-table" key={index}>
                                <tbody>
                                    <tr>
                                        <td>Mã số đồng hồ</td>
                                        <td>{data.meterId}</td>
                                    </tr>
                                    <tr>
                                        <td>Số serial</td>
                                        <td>{data.serial}</td>
                                    </tr>
                                    <tr>
                                        <td>Chủ hộ</td>
                                        <td>{data.owner}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                    </div>
                ) : (
                    <p>Chọn khu vực khác để xem thông tin</p>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
