import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./MainComponent";
import MainComponent2 from "./MainComponent2";
// import DrawRectangle from "./DrawRectangle";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes basename="/">
          <Route path="/" element={<MainComponent />} />
          <Route path="/sairam" element={<MainComponent2/>}/>
          {/* <Route path="/" element={<DrawRectangle />} /> */}
          {/* <Route path="/" element={<ReactImageAnnotation />} /> */}
          {/* <Route path="/" element={<Functional />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
