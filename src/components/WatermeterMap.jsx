

import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { loadGeoJson } from '../utils/geojsonLoader'; // Import hàm loadGeoJson từ utils

const containerStyle = {
  width: '100%', // Chiều rộng  bản đồ
  height: '100vh', // Chiều cao bản đồ
};

const center = {
  lat: 10.762622, // Vĩ độ trung tâm 
  lng: 106.660172, // Kinh độ trung 
};

const markers = [

  { lat: 10.9744159, lng: 106.4948968 },
  { lat: 10.4147541, lng: 106.9714754 },
  { lat: 10.8860463, lng: 106.6380764 },   
  // { lat: 10.7816783, lng: 106.6580764 },
  // { lat: 10.7828823, lng: 106.6980764 },
  // { lat: 10.7941361, lng: 106.6942543 },
  // { lat: 10.7939072, lng: 106.6622172 },
  // { lat: 10.7936121, lng: 106.6946965 },
  { lat: 10.6901149, lng: 106.5826774 },
  // { lat: 10.7933411, lng: 106.7004888 },
  { lat: 10.6959787, lng: 106.6916699 },
  // { lat: 10.7692622, lng: 106.6672172 },
  // { lat: 10.7702622, lng: 106.6682172 },
  // { lat: 10.7912622, lng: 106.6692172 },
  { lat: 10.7822622, lng: 106.6702172 },
]; // Danh sách tọa độ các markers

function WatermeterMap({ selectedArea, setSelectedArea }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Nạp API key từ .env, vì dùng vite nên phải là import.meta.env.
  });

  const [map, setMap] = useState(null); // State lưu trữ đối tượng map
  const [geoJsonData, setGeoJsonData] = useState(null); // State lưu trữ dữ liệu GeoJson
  const [labels, setLabels] = useState([]); // State lưu trữ các nhãn

  useEffect(() => {
    const fetchGeoJson = async () => {
      const data = await loadGeoJson('/hcm.geojson'); // Tải dữ liệu GeoJson từ file
      setGeoJsonData(data); // Lưu dữ liệu GeoJson vào state
    };
    fetchGeoJson();
  }, []);

  useEffect(() => {
    if (map && geoJsonData) {
      map.data.addGeoJson(geoJsonData); // Thêm dữ liệu GeoJson vào bản đồ
      map.data.setStyle((feature) => {
        const district = feature.getProperty('name'); // Lấy tên khu vực từ thuộc tính của feature
        const isSelected = selectedArea === district; // Kiểm tra xem khu vực có được chọn không
        const isHCMSelected = selectedArea === 'Hồ Chí Minh'; // Kiểm tra xem thành phố Hồ Chí Minh có được chọn không
        const fillColor = isSelected ? '#FF5733' : isHCMSelected ? '#33A8FF' : '#a3e635'; // Đặt màu nền
        const strokeColor = isSelected ? '#C70039' : isHCMSelected ? '#1E90FF' : '#581845'; // Đặt màu viền

        return {
          fillColor,
          fillOpacity: isSelected ? 0.4 : 0.3, // Đặt độ mờ nền
          strokeColor,
          strokeWeight: 1, // Đặt độ dày viền
        };
      });

      map.data.addListener('click', (event) => {
        const district = event.feature.getProperty('name'); // Lấy tên khu vực từ sự kiện click
        setSelectedArea(district); // Cập nhật khu vực được chọn
        map.panTo(event.latLng); // Di chuyển bản đồ đến vị trí click
      });

      // Lọc để chỉ giữ các vùng (polygon)
      map.data.forEach((feature) => {
        if (feature.getGeometry().getType() !== 'Polygon' && feature.getGeometry().getType() !== 'MultiPolygon') {
          map.data.remove(feature); // Loại bỏ các feature không phải là Polygon hoặc MultiPolygon
        }
      });

      // Thêm nhãn cho từng vùng/quận huyện
      const newLabels = [];
      map.data.forEach((feature) => {
        const districtName = feature.getProperty('name'); // Lấy tên khu vực từ feature
        const bounds = new window.google.maps.LatLngBounds();
        feature.getGeometry().forEachLatLng((latLng) => {
          bounds.extend(latLng); // Mở rộng bounds với các tọa độ của feature
        });
        const center = bounds.getCenter(); // Lấy trung tâm của bounds

        const label = new window.google.maps.Marker({
          position: center,
          map,
          label: districtName, // Đặt nhãn là tên khu vực
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 0, // Ẩn icon marker
          },
        });
        newLabels.push(label); // Thêm nhãn vào danh sách nhãn
      });
      setLabels(newLabels); // Cập nhật state nhãn

      // Xử lý sự kiện zoom để hiển thị/ẩn nhãn
      const handleZoomChanged = () => {
        const zoomLevel = map.getZoom();
        newLabels.forEach(label => {
          if (zoomLevel >= 12) {
            label.setVisible(true); // Hiển thị nhãn nếu zoom đủ lớn
          } else {
            label.setVisible(false); // Ẩn nhãn nếu zoom nhỏ
          }
        });
      };

      handleZoomChanged(); // Gọi lần đầu để thiết lập ban đầu

      map.addListener('zoom_changed', handleZoomChanged); // Thêm listener cho sự kiện zoom
    }
  }, [map, geoJsonData, selectedArea, setSelectedArea]);

  const onLoad = (map) => {
    setMap(map); // Lưu đối tượng map vào state
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center} // Đặt trung tâm bản đồ
      zoom={10} //  mức zoom ban đầu
      onLoad={onLoad} // Gọi hàm onLoad khi bản đồ tải xong
    >
      {markers.map((position, index) => (
        <MarkerF
          key={index}
          position={position}
          options={{
            icon: {
              url: '../src/assets/water-meter-2.svg', // URL cho marker icon
              scaledSize: new window.google.maps.Size(40, 40), // Điều chỉnh kích thước icon nếu cần
            },
          }}
        />
      ))}
    </GoogleMap>
  ) : null;
}

export default React.memo(WatermeterMap); // Sử dụng React.memo để tối ưu hiệu suất
