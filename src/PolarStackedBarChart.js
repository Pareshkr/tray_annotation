import React from "react";
import ReactEcharts from "echarts-for-react";

export default function PolarStackedBarChart() {
  function generateRandomPercentageArray(length) {
    const minPercentage = 10;
    const maxPercentage = 100;
    const randomPercentages = [];

    for (let i = 0; i < length; i++) {
      const randomPercentage =
        Math.random() * (maxPercentage - minPercentage) + minPercentage;
      randomPercentages.push(randomPercentage.toFixed(2)); // Round to 2 decimal places
    }

    return randomPercentages;
  }

  const startingPoint = 1;

  // 1, 3, 7, 15, 30

  const array1 = generateRandomPercentageArray(7);
  const array2 = generateRandomPercentageArray(7);
  const array3 = generateRandomPercentageArray(7);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    angleAxis: {
      type: "category",
      data: (function () {
        let list = [];
        for (let i = startingPoint; i <= 7; i++) {
          list.push("Sep " + i);
        }
        return list;
      })(),
    },
    radiusAxis: {},
    polar: {},
    series: [
      {
        type: "bar",
        data: array1,
        coordinateSystem: "polar",
        name: "Flormar",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
      {
        type: "bar",
        data: array2,
        coordinateSystem: "polar",
        name: "Lakme",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
      {
        type: "bar",
        data: array3,
        coordinateSystem: "polar",
        name: "Sugar",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
    ],
    legend: {
      show: true,
      data: ["Flormar", "Lakme", "Sugar"],
    },
  };

  //   console.log("Array 1:", array1);
  //   console.log("Array 2:", array2);
  //   console.log("Array 3:", array3);

  return (
    <>
      <ReactEcharts
        option={options}
        style={{ width: "699x", height: "330px" }}
      ></ReactEcharts>
    </>
  );
}
