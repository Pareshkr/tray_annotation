import React, { useState, useEffect, useRef } from "react";
// import DemoImage from "./assets/shelf_image.png";
import DemoImage from "./assets/floor_layout.png";
// import DemoImage from "./assets/floor_layout.jpg";

function MainComponent() {
  const imageRef = useRef(null);
  const [realDimension, setRealDimension] = useState({
    width: 0,
    height: 0,
  });
  const [plottedDimensions, setPlottedDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [drawing, setDrawing] = useState(false);
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [id, setId] = useState(1);
  const [rectangles, setRectangles] = useState([]);
  const [boxProps, setBoxProps] = useState([]);
  const [scaledBoxProps, setScaledBoxProps] = useState([]);

  //Find real, rendered dimensions & offset wrt VP of the image
  const findDimensions = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const imgDiv = imageRef.current;
    const { width, height, left, top } = imgDiv.getBoundingClientRect();
    console.log("Plotted Width", imgDiv.getBoundingClientRect().width);
    console.log("Plotted Height", imgDiv.getBoundingClientRect().height);
    console.log("Real Width", naturalWidth);
    console.log("Real Height", naturalHeight);
    setRealDimension({ width: naturalWidth, height: naturalHeight });
    setPlottedDimensions({ width: width, height: height });
    setImgOffset({ x: left, y: top });
  };

  // useEffect(() => {
  //   if (realDimension.width !== 0) {
  //     console.log("Real", realDimension);
  //     console.log("Rendered", plottedDimensions);
  //     console.log("Offset", imgOffset);
  //   }
  // }, [realDimension, plottedDimensions]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDrawing(true);
    const x = event.clientX;
    const y = event.clientY;
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

    if (drawing) {
      setEndPos({ x, y });
    }
  };

  const handleMouseUp = () => {
    if (drawing) {
      setDrawing(false);
      setId(id + 1);
      const rect = {
        left: Math.min(startPos.x, endPos.x),
        top: Math.min(startPos.y, endPos.y),
        width: Math.abs(endPos.x - startPos.x),
        height: Math.abs(endPos.y - startPos.y),
      };
      const box = {
        id: id,
        x1: Math.min(startPos.x, endPos.x),
        x2: Math.max(startPos.x, endPos.x),
        y1: Math.min(startPos.y, endPos.y),
        y2: Math.max(startPos.y, endPos.y),
        width: Math.abs(endPos.x - startPos.x),
        height: Math.abs(endPos.y - startPos.y),
      };
      setRectangles((prevRectangles) => [...prevRectangles, rect]);
      setBoxProps((prevBoxProps) => [...prevBoxProps, box]);
    }
  };

  const handleUndo = () => {
    if (rectangles.length > 0) {
      const newRectangles = [...rectangles];
      const newBoxProps = [...boxProps];
      const newScaledBoxProps = [...scaledBoxProps];
      newRectangles.pop(); // Remove the last object
      newBoxProps.pop(); // Remove the last object
      newScaledBoxProps.pop(); // Remove the last object
      setRectangles(newRectangles);
      setBoxProps(newBoxProps);
      setScaledBoxProps(newScaledBoxProps);
      if (id > 0) {
        setId(id - 1);
      } else {
        return;
      }
    }
  };

  // const handleSendData = () => {
  //   console.log("Scaled", scaledBoxProps);
  // };

  useEffect(() => {
    const scale_factor_x = realDimension.width / plottedDimensions.width;
    const scale_factor_y = realDimension.height / plottedDimensions.height;

    setScaledBoxProps(
      boxProps.map((boxProp) => {
        const { id, x1, x2, y1, y2 } = boxProp;
        const x1_scaled = Math.floor((x1 - imgOffset.x) * scale_factor_x);
        const x2_scaled = Math.ceil((x2 - imgOffset.x) * scale_factor_x);
        const y1_scaled = Math.floor((y1 - imgOffset.y) * scale_factor_y);
        const y2_scaled = Math.ceil((y2 - imgOffset.y) * scale_factor_y);
        return {
          id: id,
          x: x1_scaled,
          // x2: x2_scaled,
          y: y1_scaled,
          // y2: y2_scaled,
          width: x2_scaled - x1_scaled,
          height: y2_scaled - y1_scaled,
        };
      })
    );
    // eslint-disable-next-line
  }, [rectangles]);

  // console.log("Drawed", rectangles);
  // console.log("Box", boxProps);
  // console.log("Scaled", scaledBoxProps);
  // console.log("Real", realDimension)

  return (
    <>
      <section className="w-full h-screen relative flex justify-center bg-black">
        <div className="absolute top-3 right-5 z-50 flex flex-col space-y-2">
          <button
            className="text-white bg-emerald-500 w-16 h-8 rounded-sm"
            onClick={() => {
              console.log("Scaled", scaledBoxProps);
            }}
          >
            Print
          </button>
          <button
            className="text-black bg-slate-200 w-16 h-8 rounded-sm"
            onClick={handleUndo}
          >
            Undo
          </button>
        </div>

        <div
          // ref={imageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="self-center"
        >
          <img
            ref={imageRef}
            onLoad={findDimensions}
            // onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}
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
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
              }}
            >
              <span className="relative text-white -top-6 left-1">
                Bay {index + 1}
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
      </section>
    </>
  );
}

export default MainComponent;
