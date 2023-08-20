import React, { useState, useEffect, useRef } from "react";
import DemoImage from "./assets/shelf_image.png";

function MainComponent() {
  const imgDivRef = useRef(null);
  const [realDimension, setRealDimension] = useState({
    width: 0,
    height: 0,
  });
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [drawing, setDrawing] = useState(false);
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  // let [refStartPos, setRefStartPos] = useState({});
  // const [refEndPos, setRefEndPos] = useState({ x: 0, y: 0 });
  // const [boxProp, setBoxProp] = useState({});
  const [rectangles, setRectangles] = useState([]);

  //Find real, rendered dimensions & offset wrt VP of the image
  const findDimensions = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const imgDiv = imgDivRef.current;
    const { width, height, left, top } = imgDiv.getBoundingClientRect();
    setRealDimension({ width: naturalWidth, height: naturalHeight });
    setRenderedDimensions({ width: width, height: height });
    setImgOffset({ x: left, y: top });
  };

  // useEffect(() => {
  //   if (realDimension.width !== 0) {
  //     console.log("Real", realDimension);
  //     console.log("Rendered", renderedDimensions);
  //     console.log("Offset", imgOffset);
  //   }
  // }, [realDimension, renderedDimensions]);

  const startDrawingRectangle = (event) => {
    event.preventDefault();
    setDrawing(true);
    const x = event.clientX;
    const y = event.clientY;
    // console.log("Start", x, y);
    setStartPos({ x: x, y: y });
    setEndPos({ x: x, y: y });
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!drawing) {
      return;
    }

    let x = event.clientX;
    let y = event.clientY;
    // console.log("end", x, y);
    // console.log(event);

    if (drawing) {
      setEndPos({ x, y });
    }

    // setBoxProp((prev) => ({
    //   ...prev,
    //   width: rectWidht,
    //   height: rectHeight,
    // }));
  };

  // useEffect(() => {
  //   let minX = Math.min(startPos.x, endPos.x);
  //   let minY = Math.min(startPos.y, endPos.y);
  //   let refX = Math.abs(minX - imgOffset.x);
  //   let refy = Math.abs(minY - imgOffset.y);
  //   let refWidth = Math.abs(endPos.x - startPos.x);
  //   let refHeight = Math.abs(endPos.y - startPos.y);

  //   if (isDrawing) {
  //     setRefStartPos({
  //       left: refX,
  //       top: refy,
  //       width: refWidth,
  //       height: refHeight,
  //     });
  //   }
  // }, [endPos]);

  // console.log(refStartPos);

  const handleMouseUp = () => {
    if (drawing) {
      setDrawing(false);
      const rect = {
        left: Math.min(startPos.x, endPos.x),
        top: Math.min(startPos.y, endPos.y),
        width: Math.abs(endPos.x - startPos.x),
        height: Math.abs(endPos.y - startPos.y),
      };
      setRectangles((prevRectangles) => [...prevRectangles, rect]);
    }
  };

  // console.log("BOX OBJECT", boxProp);
  // console.log("BOX ARRAY", boxProps);

  return (
    <section className="relative w-full h-screen flex justify-center bg-black border border-black">
      <div ref={imgDivRef} className="relative self-center">
        <img
          onLoad={findDimensions}
          onMouseDown={startDrawingRectangle}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          // onMouseLeave={handleMouseUp}
          src={DemoImage}
          alt="demoImage"
          className="max-h-[97vh]"
        />
        {rectangles.map((box, index) => (
          <div
            key={index}
            className="absolute border-2 border-white"
            style={{
              left: box.left - imgOffset.x,
              top: box.top - imgOffset.y,
              width: box.width,
              height: box.height,
            }}
          >
            <span className="relative text-white -top-6 left-1">
              {index + 1}
            </span>
          </div>
        ))}
        {/* {drawing && (
          <div
            className="absolute border-2 border-green-500"
            style={{
              left: Math.min(startPos.x, endPos.x),
              top: Math.min(startPos.y, endPos.y),
              width: Math.abs(endPos.x - startPos.x),
              height: Math.abs(endPos.y - startPos.y),
            }}
          />
        )} */}
      </div>
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
    </section>
  );
}

export default MainComponent;
