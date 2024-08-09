import React from 'react';

const Header = () => {
  return (
    <div className="w-full p-4 bg-white shadow flex items-center">
      <input
        type="text"
        placeholder="Tìm kiếm nhà vườn"
        className="border p-2 w-full"
      />
    </div>
  );
};

export default Header;
