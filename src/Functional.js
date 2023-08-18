import { React, useState } from "react";
import Annotation from "react-image-annotation";
import DemoImage from "./assets/Demo_Image.jpeg";

function Functional() {
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});

  const onChange = (updatedAnnotation) => {
    setAnnotation(updatedAnnotation);
  };

  const onSubmit = () => {
    const { geometry, data } = annotation;

    setAnnotations((prevAnnotations) => [
      ...prevAnnotations,
      {
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      },
    ]);

    setAnnotation({});
  };

  const handleImageClick = (event) => {
    const newAnnotation = {
      geometry: {
        type: "RECTANGLE", // You might need to adjust the geometry type
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
        width: 100, // Example width
        height: 100, // Example height
      },
      data: {},
    };

    setAnnotation(newAnnotation);
    onSubmit();
  };
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[500px]">
        <Annotation
          src={DemoImage}
          alt="Two pebbles anthropomorphized holding hands"
          annotations={annotations}
          type={annotation.type}
          value={annotation}
          onChange={onChange}
          onSubmit={onSubmit}
          allowTouch
        />
      </div>
    </div>
  );
}

export default Functional;
