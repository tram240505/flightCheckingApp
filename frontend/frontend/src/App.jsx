import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightChecking from "./components/FlightChecking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlightChecking />} />
      </Routes>
    </BrowserRouter>
  );
}
