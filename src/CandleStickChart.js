import React from "react";
import ReactApexChart from "react-apexcharts";

const CandlestickChart = () => {
  const series = [
    {
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
        {
          x: new Date(1538782200000),
          y: [6630.71, 6648.95, 6623.34, 6635.65],
        },
        {
          x: new Date(1538784000000),
          y: [6635.65, 6651, 6629.67, 6638.24],
        },
        {
          x: new Date(1538785800000),
          y: [6638.24, 6640, 6620, 6624.47],
        },
        {
          x: new Date(1538787600000),
          y: [6624.53, 6636.03, 6621.68, 6624.31],
        },
        {
          x: new Date(1538789400000),
          y: [6624.61, 6632.2, 6617, 6626.02],
        },
        {
          x: new Date(1538791200000),
          y: [6627, 6627.62, 6584.22, 6603.02],
        },
        {
          x: new Date(1538793000000),
          y: [6605, 6608.03, 6598.95, 6604.01],
        },
        {
          x: new Date(1538794800000),
          y: [6604.5, 6614.4, 6602.26, 6608.02],
        },
        {
          x: new Date(1538796600000),
          y: [6608.02, 6610.68, 6601.99, 6608.91],
        },
      ],
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      download: true,
      downloadCSV: {
        separator: ",",
        filename: "custom-candlestick-data.csv",
        customHeader: ["Date", "A", "B", "C", "D"],
      },
    },
    xaxis: {
      type: "datetime",
    },
    title: {
      text: "Shelfullness Chart",
      align: "left",
    },
    tooltip: {
      enabled: true,
    },
    // annotations: {
    //   xaxis: [
    //     {
    //       x: 'Oct 06 14:00',
    //       borderColor: '#00E396',
    //       label: {
    //         borderColor: '#00E396',
    //         style: {
    //           fontSize: '12px',
    //           color: '#fff',
    //           background: '#00E396',
    //         },
    //         orientation: 'horizontal',
    //         offsetY: 7,
    //         text: 'Annotation Test',
    //       },
    //     },
    //   ],
    // },

    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    // plotOptions: {
    //   candlestick: {
    //     colors: {
    //       upward: getColor,
    //       downward: '#44BE54',
    //     },
    //   },
    // },
  };

  return (
    <div
      className="candlestick-chart"
      // style={{ height: "80%" }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={"600"}
        width={"800"}
        // height={"100%"}
        // width={"100%"}
      />
    </div>
  );
};

export default CandlestickChart;
