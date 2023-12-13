import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import TestButton from "./TestButton";
// import * as echarts from "echarts";

export default function GaugeChart() {
  const [randomNumbers, setRandomNumbers] = useState([0, 0, 0]);
  const [parentToggleValue, setParentToggleValue] = useState(false);

  const updateParentToggleValue = (newValue) => {
    setParentToggleValue(newValue);
  };

  console.log("Value", parentToggleValue);

  const generateRandomNumbers = () => {
    const newRandomNumbers = [];
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * 101);
      newRandomNumbers.push(randomNumber);
    }
    setRandomNumbers(newRandomNumbers);
  };

  const gaugeData = [
    {
      value: randomNumbers[0],
      name: "Flormar",
      title: {
        offsetCenter: ["0%", "-30.5%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "-20%"],
      },
      itemStyle: {
        color: "#4ade80", // Color for the first data series
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(128, 255, 165)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(1, 191, 236)",
        //   },
        // ]),
      },
    },
    {
      value: randomNumbers[1],
      name: "Lakme",
      title: {
        offsetCenter: ["0%", "-0.5%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "10%"],
      },
      itemStyle: {
        color: "#3b82f6", // Color for the second data series
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(55, 162, 255)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(116, 21, 219)",
        //   },
        // ]),
      },
    },
    {
      value: randomNumbers[2],
      name: "Sugar",
      title: {
        offsetCenter: ["0%", "29.5%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "40%"],
      },
      itemStyle: {
        color: "#db2777", // Color for the third data series
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(255, 0, 135)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(135, 0, 157)",
        //   },
        // ]),
      },
    },
  ];

  const options = {
    title: {
      text: "Brand wise shelf-fullness", // Set the chart title
      top: "5%", // Adjust the top position as needed
      left: "center", // Center the title horizontally
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}%", // Display brand name and value
    },
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 0.7,
            borderColor: "#e6ebf8",
          },
        },
        axisLine: {
          lineStyle: {
            width: 80,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 16,
          fontSize: 18,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          rich: {
            detailText: {
              fontSize: 16,
              padding: [5, 5, 15, 5],
            },
          },
          formatter: function (value) {
            return `{detailText|${value}%}`;
          },
        },
      },
    ],
  };
  return (
    <>
      <ReactEcharts
        option={options}
        style={{ width: "100%", height: "550px" }}
      ></ReactEcharts>

      <div className="w-full flex justify-center">
        {/* <button
          onClick={generateRandomNumbers}
          className="w-28 h-12 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 rounded-md shadow-lg font-semibold text-white"
        >
          CHANGE
        </button> */}
        <TestButton onToggle={updateParentToggleValue} />
      </div>
    </>
  );
}
