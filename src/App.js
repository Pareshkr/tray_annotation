import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./MainComponent";
import MainComponent2 from "./MainComponent2";
import CandleStickChart from "./CandleStickChart";
import WaterFallChart from "./WaterFallChart";
import WaterFallChart2 from "./WaterFallChart2";
import PolarStackedBarChart from "./PolarStackedBarChart";
import GaugeChart from "./GaugeChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import BayAnnotation from "./BayAnnotation";
import BayOnboard from "./BayOnboard/BayOnboard";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "rubik",
      textTransform: "none",
      fontSize: 16,
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes basename="/">
            <Route path="/" element={<BayOnboard />} />
            <Route path="/bayAnnotation" element={<BayAnnotation />} />
            <Route path="/mainComponent" element={<MainComponent />} />
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
      </ThemeProvider>
    </div>
  );
}

export default App;
