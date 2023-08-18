import React, { useState, useEffect, useRef } from "react";
import DemoImage from "./assets/shelf_image.png";

function MainComponent() {
  const imgDivRef = useRef(null);
  const imgOffSetX = useRef(null);
  const imgOffSetY = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  // eslint-disable-next-line
  const [actualImageDimensions, setActualImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  // eslint-disable-next-line
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: 0,
    height: 0,
  });

  // const [actualCoordinates, setActualCoordinates] = useState([]);
  const [boxProp, setBoxProp] = useState({});
  const [boxProps, setBoxProps] = useState([]);
  // const [coordinates, setCoordinates] = useState([]);
  // const [transformedCoordinates, setTransformedCoordinates] = useState([]);

  // Function to find dimensions of rendered image
  const updateRenderedDimensions = () => {
    const imgDiv = imgDivRef.current;
    if (imgDiv) {
      const { width, height, top, left } = imgDiv.getBoundingClientRect();
      setRenderedDimensions({ width, height });
      imgOffSetX.current = left;
      imgOffSetY.current = top;
    }
  };
  // console.log("TOP", imgOffSetX);
  // console.log("LEFT", imgOffSetY);
  useEffect(() => {
    updateRenderedDimensions();
    window.addEventListener("resize", updateRenderedDimensions);
    return () => {
      window.removeEventListener("resize", updateRenderedDimensions);
    };
  }, []);

  //Function to find actual dimensions of the image
  const findActualDimensions = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setActualImageDimensions({ width: naturalWidth, height: naturalHeight });
    updateRenderedDimensions();
  };

  const startDrawingRectangle = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    startX.current = nativeEvent.clientX - imgOffSetX.current;
    startY.current = nativeEvent.clientY - imgOffSetY.current;

    setIsDrawing(true);

    setBoxProp((prev) => ({
      ...prev,
      top: startX.current,
      left: startY.current,
    }));
  };

  const drawRectangle = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    const newMouseX = nativeEvent.clientX - imgOffSetX.current;
    const newMouseY = nativeEvent.clientY - imgOffSetY.current;

    const rectWidht = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;

    setBoxProp((prev) => ({
      ...prev,
      width: rectWidht,
      height: rectHeight,
    }));
  };
  const stopDrawingRectangle = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setBoxProps((prev) => [...prev, boxProp]);
    }
  };

  console.log("BOX OBJECT", boxProp);
  console.log("BOX ARRAY", boxProps);

  return (
    <section className="w-full h-screen flex justify-center border border-black">
      <div ref={imgDivRef} className="relative self-center border border-black">
        <img
          onLoad={findActualDimensions}
          onMouseDown={startDrawingRectangle}
          onMouseMove={drawRectangle}
          onMouseUp={stopDrawingRectangle}
          onMouseLeave={stopDrawingRectangle}
          src={DemoImage}
          alt="demoImage"
          className="max-h-[97vh] cursor-pointer"
        />
        {boxProps.map((box, index) => (
          <div
            key={index}
            className="border-2 border-[#10B981]"
            style={{
              position: "absolute",
              left: `${box.left}px`,
              top: `${box.top}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
              // backgroundColor: "#10B981",
              // borderRadius: "50%",
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default MainComponent;
