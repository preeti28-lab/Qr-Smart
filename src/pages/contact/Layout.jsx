import React, { useState } from "react";
import chairImg from "../../assets/chair.png"; // Import chair image
import "./LibraryLayout.css";

import { PiOfficeChairFill } from "react-icons/pi";

const chairsData = [
  { id: 32, x: 18, y: 2 },
  { id: 31, x: 0, y: 0 },
  { id: 30, x: 3, y: 3 },
  { id: 29, x: 3, y: 4 },
  { id: 28, x: 3, y: 5 },
  { id: 27, x: 6, y: 1 },
  { id: 26, x: 7, y: 1 },
  { id: 25, x: 8, y: 1 },
  { id: 24, x: 9, y: 1 },
  { id: 23, x: 6, y: 4 },
  { id: 22, x: 6, y: 5 },
  { id: 21, x: 7, y: 5 },
  { id: 20, x: 7, y: 4 },
  { id: 19, x: 9, y: 4 },
  { id: 18, x: 10, y: 4 },
  { id: 17, x: 17, y: 4 },
  { id: 16, x: 18, y: 7 },
  // { id: 15, x: 2, y: 3 },
  // { id: 14, x: 1, y: 3 },
  // { id: 13, x: 0, y: 3 },
  // { id: 12, x: 7, y: 2 },
  // { id: 11, x: 6, y: 2 },
  // { id: 10, x: 5, y: 2 },
  // { id: 9, x: 4, y: 2 },
  // { id: 8, x: 3, y: 1 },
  // { id: 7, x: 2, y: 1 },
  // { id: 6, x: 1, y: 1 },
  // { id: 5, x: 0, y: 1 },
  // { id: 4, x: 3, y: 0 },
  // { id: 3, x: 2, y: 0 },
  // { id: 2, x: 1, y: 0 },
  // { id: 1, x: 2, y: 2 }
];

const Layout = () => {
  const [selectedChair, setSelectedChair] = useState(null);

  const handleChairClick = (chairId) => {
    setSelectedChair(chairId);
    alert(`Chair ${chairId} clicked!`);
  };

  return (
    <div className="library-layout">
      <h2>Library Layout</h2>
      <div className="layout">
        {chairsData.map((chair) => (
          <div
            key={chair.id}
            className={`chair ${selectedChair === chair.id ? "selected" : ""}`}
            onClick={() => handleChairClick(chair.id)}
            style={{ gridColumn: chair.x + 1, gridRow: chair.y + 1 }}
          >
            {/* <img src={chairImg} alt={`Chair ${chair.id}`} /> */}
            <PiOfficeChairFill size={30} />

            <span>{chair.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
