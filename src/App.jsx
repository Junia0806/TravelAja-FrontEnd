/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Auth/login';

function App() {

  return (
    <BrowserRouter>
    <Routes> 
    <Route path="/" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
