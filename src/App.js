import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./MainComponent";
// import DrawRectangle from "./DrawRectangle";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes basename="/">
          <Route path="/" element={<MainComponent />} />
          {/* <Route path="/" element={<DrawRectangle />} /> */}
          {/* <Route path="/" element={<ReactImageAnnotation />} /> */}
          {/* <Route path="/" element={<Functional />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
