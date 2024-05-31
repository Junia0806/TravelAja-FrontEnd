/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pencarian } from "./componen/pencarian";
import { DetailTiket } from "./componen/detailtiket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pencarian" element={<Pencarian />} />
        <Route path="/detailtiket" element={<DetailTiket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
