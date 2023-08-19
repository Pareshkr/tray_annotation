import React, { useRef, useState } from "react";
import image from "./assets/shelf_image.png";

const MainComponent2 = () => {
  const containerRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState([]);

  const handleMouseDown = (event) => {
    //   const container = containerRef.current;
    //   const rect = container.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    setDrawing(true);
    setStartPos({ x, y });
    setEndPos({ x, y });
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!drawing) return;
    //   const container = containerRef.current;
    //   const rect = container.getBoundingClientRect();
    let x = event.clientX;
    let y = event.clientY;

    console.log(event.clientX, x);
    if (drawing) {
      setEndPos({ x, y });
    }
  };

  const handleMouseUp = () => {
    if (drawing) {
      setDrawing(false);
      const rect = {
        x: Math.min(startPos.x, endPos.x),
        y: Math.min(startPos.y, endPos.y),
        width: Math.abs(endPos.x - startPos.x),
        height: Math.abs(endPos.y - startPos.y),
      };
      setRectangles((prevRectangles) => [...prevRectangles, rect]);
    }
  };

  return (
    <div
      className="flex justify-center bg-black items-center p-4 h-screen w-screen"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img src={image} alt="Image1" className="h-full" />
      {rectangles.map((rect, index) => (
        <div
          key={index}
          className="absolute border-2 border-white"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
          }}
        >
          <span className="relative text-white -top-7 left-1">{index + 1}</span>
        </div>
      ))}
      {drawing && (
        <div
          className="absolute border-2 border-green-500"
          style={{
            left: Math.min(startPos.x, endPos.x),
            top: Math.min(startPos.y, endPos.y),
            width: Math.abs(endPos.x - startPos.x),
            height: Math.abs(endPos.y - startPos.y),
          }}
        />
      )}
    </div>
  );
};

export default MainComponent2;
