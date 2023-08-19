import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./MainComponent";
import MainComponent2 from "./MainComponent2";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes basename="/">
          <Route path="/" element={<MainComponent />} />
          <Route path="/sairam" element={<MainComponent2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
