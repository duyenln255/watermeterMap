import React, { useState } from 'react';
// import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WatermeterMap from './components/WatermeterMap';
import './index.css';
import './App.css';

const App = () => {
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <div className="grid-container">
      <div id="main-map" className="relative">
        {/* <Header /> */}
        <WatermeterMap selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
      </div>
      <div className="sidebar">
        <Sidebar selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
      </div>
    </div>
  );
};

export default App;
