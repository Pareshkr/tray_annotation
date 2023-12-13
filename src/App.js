import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./MainComponent";
import MainComponent2 from "./MainComponent2";
import CandleStickChart from "./CandleStickChart";
import WaterFallChart from "./WaterFallChart";
import WaterFallChart2 from "./WaterFallChart2";
import PolarStackedBarChart from "./PolarStackedBarChart";
import GaugeChart from "./GaugeChart";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes basename="/">
          <Route path="/" element={<MainComponent />} />
          <Route path="/sairam" element={<MainComponent2 />} />
          <Route path="/candleStickChart" element={<CandleStickChart />} />
          <Route path="/waterFallChart" element={<WaterFallChart />} />
          <Route path="/waterFallChart2" element={<WaterFallChart2 />} />
          <Route
            path="/polarStackedBarChart"
            element={<PolarStackedBarChart />}
          />
          <Route path="/gaugeChart" element={<GaugeChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
