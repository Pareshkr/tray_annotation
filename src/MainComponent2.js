import React, { useRef, useState } from "react";
import image from "./assets/shelf_image.png";

const MainComponent2 = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState([]);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const imgOnLoad = () => {
    const imgDiv = imgRef.current;
    const { width, height, left, top } = imgDiv.getBoundingClientRect();
    setImgSize({ ...imgSize, width: width, height: height });
    console.log(imgDiv.getBoundingClientRect().height);
    // const {left, top, }
  };

  const handleMouseDown = (event) => {
    //   const container = containerRef.current;
    //   const rect = container.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    console.log(x);
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
    <div className=" bg-black h-screen w-screen overflow-hidden flex justify-center items-center">
        <div
          className={`flex justify-center overflow-hidden w-[${imgSize.width}] h-[${imgSize.height}] border-2 border-white`}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={image}
            alt="Image1"
            className="max-h-[97vh]"
            ref={imgRef}
            onLoad={imgOnLoad}
          />
          {rectangles.map((rect, index) => (
            <div
              key={index}
              className="absolute border-2 border-white"
              id={index}
              style={{
                left: rect.x,
                top: rect.y,
                width: rect.width,
                height: rect.height,
              }}
            >
              <span className="relative text-white -top-7 left-1">
                {index + 1}
              </span>
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
    </div>
  );
};

export default MainComponent2;
