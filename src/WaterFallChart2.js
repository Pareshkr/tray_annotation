import React from "react";
import ReactEcharts from "echarts-for-react";

export default function WaterFallChart2() {
  const mayData = {
    total: [
      76, 74, 77, 78, 71, 75, 76, 79, 78, 76, 71, 76, 75, 76, 80, 75, 76, 74,
      78, 75, 78, 73, 73, 69, 73, 64, 43, 45, 39, 51, 42,
    ],
    increase: [
      3,
      "-",
      3,
      1,
      "-",
      4,
      1,
      3,
      "-",
      "-",
      "-",
      5,
      "-",
      1,
      4,
      "-",
      1,
      "-",
      4,
      "-",
      3,
      "-",
      "-",
      "-",
      4,
      "-",
      "-",
      2,
      "-",
      12,
      "-",
    ],
    decrease: [
      "-",
      3,
      "-",
      "-",
      7,
      "-",
      "-",
      "-",
      1,
      2,
      5,
      "-",
      1,
      "-",
      "-",
      5,
      "-",
      2,
      "-",
      3,
      "-",
      5,
      "-",
      4,
      "-",
      9,
      20,
      "-",
      7,
      "-",
      9,
    ],
  };

  const minTotalValue = Math.min(...mayData.total) - 10;
  const maxTotalValue = Math.max(...mayData.total) + 10;

  const yAxisMin = minTotalValue <= 0 ? 0 : minTotalValue;
  const yAxisMax = maxTotalValue >= 100 ? 100 : maxTotalValue;

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tar;
        if (params[1] && params[1].value !== "-") {
          tar = params[1];
        } else {
          tar = params[2];
        }

        const isDecrease = tar.seriesName === "Decrease";
        const value = isDecrease ? tar.value : tar.value;

        const totalValue = mayData.total[params[0].dataIndex];
        const totalLabel = `Shelf-Fullness: ${totalValue}%`;
        return (
          tar &&
          tar.name +
            "<br/>" +
            tar.seriesName +
            " : " +
            `${value}%` +
            "<br/>" +
            totalLabel
        );
      },
    },
    legend: {
      show: false,
      data: ["Increase", "Decrease"],
      position: "right",
    },
    xAxis: {
      type: "category",
      data: (function () {
        let list = [];
        for (let i = 1; i <= 31; i++) {
          list.push("May " + i);
        }
        return list;
      })(),
    },
    yAxis: {
      type: "value",
      min: yAxisMin,
      max: yAxisMax,
    },
    series: [
      {
        name: "Placeholder",
        type: "bar",
        stack: "Total",
        silent: true,
        barWidth: "70%", // Increase the width of the bars
        barGap: "-30%", // Reduce the distance between bars
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
        emphasis: {
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
        },
        data: mayData.total,
      },
      {
        name: "Increase",
        type: "bar",
        stack: "Total",
        label: {
          show: false,
          position: "top",
        },
        itemStyle: {
          color: (params) => {
            if (params.data >= 5) {
              return "#44be54";
            }
            return "#b4e5bb";
          },
        },
        data: mayData.increase,
      },
      {
        name: "Decrease",
        type: "bar",
        stack: "Total",
        label: {
          show: false,
          position: "bottom",
          formatter: (params) => {
            if (params.value !== "-") {
              return -params.value;
            }
            return "-";
          },
        },
        itemStyle: {
          color: (params) => {
            if (params.data >= 5) {
              return "#fb1751";
            }
            return "#fda2b9";
          },
        },
        data: mayData.decrease,
      },
    ],
  };
  return (
    <>
      <div className="w-full h-screen flex max-[999px]:flex-col min-[1000px]:flex-row">
        <ReactEcharts
          option={options}
          style={{ width: "1200px", height: "700px" }}
          className="border border-black"
        ></ReactEcharts>
        <div className="w-40 h-24 border border-red-700"></div>
      </div>
    </>
  );
}
