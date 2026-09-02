import React, { useState } from "react";

const GridShowcaseIcons = ({ onSelect }) => {
  const [selectedGridTypeIndex, setSelectedGridTypeIndex] = useState(null);

  const boxStyle = (isSelected) => ({
    border: isSelected ? "2px solid #2196f3" : "1px solid #ccc",
    borderRadius: "8px",
    padding: "4px",
    width: "60px",
    height: "60px",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: isSelected ? "#2196f324" : "#f0f0f0",
    cursor: "pointer",
  });

  const gridItem = {
    backgroundColor: "#999",
    borderRadius: "2px",
    margin: "1px",
  };

  const handleSelect = (index) => {
    setSelectedGridTypeIndex(index);
    if (onSelect) onSelect({ selectedGridIndex: index });
  };

  return (
    <>
      <p className="font-medium text-[#000000] mb-2">View Type</p>
      <div className="flex overflow-x-auto gap-4 !mt-3">
        {/* Horizontal: 3 vertical boxes */}
        <div
          style={boxStyle(selectedGridTypeIndex === 0)}
          onClick={() => handleSelect(0)}
        >
          <div className="flex flex-col w-full h-full">
            <div style={{ ...gridItem, flex: 1 }} />
            <div style={{ ...gridItem, flex: 1 }} />
            <div style={{ ...gridItem, flex: 1 }} />
          </div>
        </div>

        {/* Vertical: 3 horizontal boxes */}
        <div
          style={boxStyle(selectedGridTypeIndex === 1)}
          onClick={() => handleSelect(1)}
        >
          <div className="flex flex-row w-full h-full">
            <div style={{ ...gridItem, flex: 1 }} />
            <div style={{ ...gridItem, flex: 1 }} />
            <div style={{ ...gridItem, flex: 1 }} />
          </div>
        </div>

        {/* Grid 1: 2 in first row, 3 in second row full width */}
        <div
          style={boxStyle(selectedGridTypeIndex === 2)}
          onClick={() => handleSelect(2)}
        >
          <div className="flex flex-col w-full h-full ">
            <div className="flex flex-row flex-1 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
            <div className="flex flex-row flex-1 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
          </div>
        </div>

        {/* Grid 2: Reverse of Grid 1 */}
        <div
          style={boxStyle(selectedGridTypeIndex === 3)}
          onClick={() => handleSelect(3)}
        >
          <div className="flex flex-col w-full h-full ">
            <div className="flex flex-row flex-1 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
            <div className="flex flex-row flex-1 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
          </div>
        </div>

        {/* Grid 3: 1st full vertical, 2nd & 3rd half height */}
        <div
          style={boxStyle(selectedGridTypeIndex === 4)}
          onClick={() => handleSelect(4)}
        >
          <div className="flex w-full h-full ">
            <div style={{ ...gridItem, flex: 1 }} />
            <div className="flex flex-col flex-1 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
          </div>
        </div>

        {/* Grid 4: Reverse of Grid 3 */}
        <div
          style={boxStyle(selectedGridTypeIndex === 5)}
          onClick={() => handleSelect(5)}
        >
          <div className="flex w-full h-full ">
            <div className="flex flex-col flex-1 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
            <div style={{ ...gridItem, flex: 1 }} />
          </div>
        </div>

        {/* Grid 5: first 2 bigger, second 2 smaller */}
        <div
          style={boxStyle(selectedGridTypeIndex === 6)}
          onClick={() => handleSelect(6)}
        >
          <div className="flex flex-col w-full h-full ">
            <div className="flex flex-row flex-2 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
            <div className="flex flex-row flex-1 ">
              <div style={{ ...gridItem, flex: 1 }} />
              <div style={{ ...gridItem, flex: 1 }} />
            </div>
          </div>
        </div>

        {/* Grid 6: equal 4 boxes 2x2 */}
        <div
          style={boxStyle(selectedGridTypeIndex === 7)}
          onClick={() => handleSelect(7)}
        >
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full ">
            <div style={gridItem} />
            <div style={gridItem} />
            <div style={gridItem} />
            <div style={gridItem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GridShowcaseIcons;
