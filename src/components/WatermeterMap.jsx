import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF, Circle } from '@react-google-maps/api';
import { loadGeoJson, getCenterOfDistrict, markers, filterWaterMeterDataByArea } from '../utils/mapUtils';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import '../styles/WatermeterMap.css';


// Cấu hình cho container của bản đồ
const containerStyle = {
  width: '100%',
  height: '100vh',
};

// Tọa độ trung tâm mặc định cho bản đồ (TP Hồ Chí Minh)
const center = {
  lat: 10.762622,
  lng: 106.660172,
};

function WatermeterMap({ selectedArea, setSelectedArea }) {
  // Sử dụng hook để tải Google Maps API, với khóa API từ file môi trường
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Khai báo các state cần thiết
  const [map, setMap] = useState(null); //  lưu trữ đối tượng bản đồ
  const [geoJsonData, setGeoJsonData] = useState(null); //  lưu trữ dữ liệu GeoJSON
  const [labels, setLabels] = useState([]);             // Biến lưu trữ các nhãn (labels) cho các khu vực
  const [currentLocation, setCurrentLocation] = useState(null); // Vị trí hiện tại của người dùng
  const [activeMarker, setActiveMarker] = useState(null);  // lưu trữ ID của marker đang được chọn
  const [filteredMarkers, setFilteredMarkers] = useState(markers); // Các marker đã được lọc theo khu vực

  // Sử dụng useEffect để tải dữ liệu GeoJSON khi component được mount
  useEffect(() => {
    const fetchGeoJson = async () => {
      const data = await loadGeoJson('/hcm.geojson');
      setGeoJsonData(data); // Lưu dữ liệu GeoJSON vào state
    };
    fetchGeoJson();
  }, []);

  // Sử dụng useEffect để cập nhật bản đồ khi map hoặc geoJsonData thay đổi
  useEffect(() => {
    if (map && geoJsonData) {
      map.data.addGeoJson(geoJsonData);
      // Thiết lập kiểu dáng cho các khu vực trên bản đồ
      map.data.setStyle((feature) => {
        const district = feature.getProperty('name'); // Lấy tên khu vực từ dữ liệu GeoJSON
        const isSelected = selectedArea === district; // Kiểm tra xem khu vực có đang được chọn không
        const fillColor = isSelected ? '#FF5733' : '#a3e635';  // Màu nền
        const strokeColor = isSelected ? '#C70039' : '#581845'; // Màu viền

        return {
          fillColor,
          fillOpacity: isSelected ? 0.4 : 0.3, // Độ đậm của màu nền
          strokeColor,
          strokeWeight: 1,  // Độ dày của viền
        };
      });

      // click cho các khu vực trên bản đồ
      map.data.addListener('click', (event) => {
        const district = event.feature.getProperty('name'); // Lấy tên khu vực được click
        setSelectedArea(district);  // Cập nhật khu vực được chọn
        map.panTo(event.latLng); // Di chuyển bản đồ đến vị trí vừa click
      });

      // Loại bỏ các feature không phải là Polygon hoặc MultiPolygon khỏi bản đồ
      map.data.forEach((feature) => {
        if (feature.getGeometry().getType() !== 'Polygon' && feature.getGeometry().getType() !== 'MultiPolygon') {
          map.data.remove(feature);
        }
      });

      // Tạo các nhãn cho từng khu vực trên bản đồ
      const newLabels = [];
      map.data.forEach((feature) => {
        const districtName = feature.getProperty('name');//lấy tên khu vuc từ dữ liệu GeoJSON
        const center = getCenterOfDistrict(districtName);// Lấy tọa độ trung tâm để đặt label

        if (center) {
          const labelText = districtName ? districtName.toString() : ''; // Đảm bảo label là chuỗi
          const label = new window.google.maps.Marker({
            position: center,
            map,
            label: {
              text: labelText,
              color: '#404e5e',
              fontSize: '14px',
              className: "label-text",
            },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 0,
            },
          });
        
          newLabels.push(label);
        }
        
      });
      setLabels(newLabels);

      // Thiết lập  thay đổi zoom, hiện/ẩn các label dựa trên mức zoom
      const handleZoomChanged = () => {
        const zoomLevel = map.getZoom();
        newLabels.forEach((label) => {
          label.setVisible(zoomLevel >= 12); // Hiện label nếu zoom >= 12
        });
      };

      handleZoomChanged();
      map.addListener('zoom_changed', handleZoomChanged);
    }
  }, [map, geoJsonData, selectedArea, setSelectedArea]); // Thêm dữ liệu GeoJSON vào bản đồ

  // Sử dụng useEffect để cập nhật các marker khi khu vực được chọn thay đổi
  useEffect(() => {
    if (selectedArea === 'Thành phố Hồ Chí Minh') {
      setFilteredMarkers(markers); // Hiển thị tất cả các marker nếu chọn TP Hồ Chí Minh
    } else {
      const newFilteredMarkers = filterWaterMeterDataByArea(markers, selectedArea);
      setFilteredMarkers(newFilteredMarkers);// Cập nhật danh sách marker được hiển thị
    }

    if (map && selectedArea) {
      const newCenter = getCenterOfDistrict(selectedArea);
      let zoomLevel;

      if (selectedArea === 'Thành phố Hồ Chí Minh') {
        zoomLevel = 10;
      } else if (['Huyện Củ Chi', 'Huyện Bình Chánh', 'Huyện Hóc Môn', 'Huyện Cần Giờ', 'Thành phố Thủ Đức'].includes(selectedArea)) {
        zoomLevel = 11.5;
      } else if (['Quận 12', 'Quận Bình Thạnh', 'Quận Tân Bình', 'Huyện Nhà Bè', 'Quận Bình Tân', 'Quận 7', 'Quận 8', 'Quận Tân Phú'].includes(selectedArea)) {
        zoomLevel = 12.4;
      } else {
        zoomLevel = 14;
      }

      map.panTo(newCenter);// Di chuyển bản đồ đến vị trí trung tâm của khu vực
      map.setZoom(zoomLevel);
    }
  }, [selectedArea, map]);

  // Hàm xử lý khi một marker được click
  const handleMarkerClick = (markerId) => {
    if (activeMarker === markerId) {
      setActiveMarker(null);// Bỏ chọn marker nếu đã được chọn trước đó
    } else {
      setActiveMarker(markerId); // Chọn marker hiện tại
    }
  };

  // Hàm xử lý khi người dùng click nút để lấy vị trí hiện tại
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(pos);
        map.panTo(pos);
        map.setZoom(13);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  // Hàm xử lý khi người dùng click nút để lấy vị trí hiện tại
  const onLoad = (map) => {
    setMap(map);
  };

  return isLoaded ? (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={{
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          },
        }}
      >
        
        {/* Hiển thị các marker đã được lọc */}
        {filteredMarkers.map((marker) => (
          <MarkerF
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker.id)}
            options={{
              icon: {
                url: '../src/assets/water-meter-2.svg',
                scaledSize: new window.google.maps.Size(30, 40),
              },
            }}
          >
            {activeMarker === marker.id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div className="infowindow-container">
                  <h4>Thông tin Đồng hồ Nước</h4>
                  <p>Chủ hộ: {marker.owner}</p>
                  <p>Số seri: {marker.serial}</p>
                  <p>Mã số đồng hồ: {marker.meterId}</p>
                  <p>Vị trí: {marker.area}</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
        {/* Hiển thị vị trí hiện tại của người dùng */}
        {currentLocation && (
          <>
            <MarkerF
              position={currentLocation}
              options={{
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: 'white',
                  strokeOpacity: 1,
                },
              }}
            />
            <Circle
              center={currentLocation}
              radius={50}
              options={{
                fillColor: '#4285F4',
                fillOpacity: 0.2,
                strokeColor: '#4285F4',
                strokeOpacity: 0.5,
                strokeWeight: 2,
              }}
            />
          </>
        )}
      </GoogleMap>
      <button
        onClick={handleCurrentLocation}
        style={{
          position: 'absolute',
          top: 'calc(100% - 200px)', // Adjusted from 160px to 200px
          right: '10px',
          zIndex: 10,
          backgroundColor: '#fff',
          border: '1px solid #4285F4',
          // borderRadius: '5px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        }}
      >
        <MyLocationIcon style={{ color: '#4285F4' }} />
      </button>
    </div>
  ) : null;
}

export default React.memo(WatermeterMap);

