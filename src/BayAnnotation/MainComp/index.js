import { React, useState, useRef } from "react";
import PropTypes from "prop-types";

// assets
// import floorLayoutImage from "../../assets/floor_layout.png";
import floorLayoutImage from "../../assets/floor_layout.jpg";

function MainComp() {
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
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [bayId, setBayId] = useState(0);
  // const [editPredBoxes, setEditPredBoxes] = useState([]);
  const [boxProps, setBoxProps] = useState([]);
  const [scaledBoxProps, setScaledBoxProps] = useState([]);
  const [hoveredBoxId, setHoveredBoxId] = useState(null);

  //Find real, rendered dimensions & offset wrt VP of the image
  const findImgDimensions = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const imgDiv = imageRef.current;
    const { width, height, left, top } = imgDiv.getBoundingClientRect();
    setImgSize({ ...imgSize, width: width, height: height });
    // console.log("Img dimensions", naturalWidth, naturalHeight);
    // console.log("Plotted dimensions", width, height);
    // const scalingFactor_width = width / naturalWidth;
    // const scalingFactor_height = height / naturalHeight;

    // setEditBoxProps(
    //   editPredBoxes.map((predBox) => {
    //     const { id, x1, x2, y1, y2, threshold } = predBox;
    //     const x1_scaled = Math.ceil(x1 * scalingFactor_width) + left;
    //     const x2_scaled = Math.floor(x2 * scalingFactor_width) + left;
    //     const y1_scaled = Math.ceil(y1 * scalingFactor_height) + top;
    //     const y2_scaled = Math.floor(y2 * scalingFactor_height) + top;
    //     return {
    //       id: id,
    //       count: threshold,
    //       x1: x1_scaled,
    //       x2: x2_scaled,
    //       y1: y1_scaled,
    //       y2: y2_scaled,
    //       width: x2_scaled - x1_scaled,
    //       height: y2_scaled - y1_scaled,
    //     };
    //   })
    // );
    setRealDimension({ width: naturalWidth, height: naturalHeight });
    setPlottedDimensions({ width: width, height: height });
    setImgOffset({ x: left, y: top });
  };

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
      const box = {
        id: bayId + 1,
        brand: "Flormar",
        x1: Math.min(startPos.x, endPos.x),
        x2: Math.max(startPos.x, endPos.x),
        y1: Math.min(startPos.y, endPos.y),
        y2: Math.max(startPos.y, endPos.y),
        width: Math.abs(endPos.x - startPos.x),
        height: Math.abs(endPos.y - startPos.y),
      };
      // setRectangles((prevRectangles) => [...prevRectangles, rect]);
      setBayId(bayId + 1);
      setBoxProps((prevBoxProps) => [...prevBoxProps, box]);
      // }
    }
  };

  // console.log("img", floorLayoutImage);

  return (
    <div className="flex-grow flex">
      <div className="flex-grow px-2 py-2 flex justify-center">
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`self-center w-[${imgSize.width}] h-[${imgSize.height}]`}
        >
          <img
            ref={imageRef}
            onLoad={findImgDimensions}
            src={floorLayoutImage}
            alt="img not found"
            // className="max-h-[97vh]"
          />
          {boxProps.map((box, index) => (
            <div
              key={index}
              // className="absolute border-2 border-white cursor-not-allowed"
              className={`absolute border-2 border-white cursor-not-allowed ${
                hoveredBoxId === box.id
                  ? "border-lime-500 bg-lime-500 bg-opacity-[.3]"
                  : ""
              }`}
              style={{
                left: box.x1,
                top: box.y1,
                width: box.width,
                height: box.height,
              }}
            >
              <span className="relative text-white -top-6 left-1">
                Bay {index + 1}
              </span>
              {/* <div className="relative w-full flex justify-between -top-6 px-1.5">
                <span className="text-rose-600 font-bold text-2xl drop-shadow-2xl">
                  {box.id}
                </span>
                <span className="text-green-500 font-bold text-xl drop-shadow-2xl">
                  Brand: {box.brand}
                </span>
              </div> */}
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
    </div>
  );
}

export default MainComp;
