/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage";
import Header from "./Components/Navbar";
import FooterSection from "./Components/Footer";
import DataDiri from "./Pages/DataDiriPage";
import Bayar from "./Pages/BayarPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-penumpang" element={<DataDiri />} />
        <Route path="/bayar" element={<Bayar />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
