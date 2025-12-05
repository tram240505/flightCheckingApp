import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightChecking from "./components/FlightChecking";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import BookingPage from "./components/BookingPage";
import MyBooking from "./components/MyBooking";
import AdminPanel from "./components/AdminPanel";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<FlightChecking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
          <ProtectedRoute>
            <MyBooking />
          </ProtectedRoute>
          }
        />
        <Route 
          path="/admin"
          element={
          <ProtectedRoute role="admin">
            <AdminPanel />
          </ProtectedRoute>
          }
        />
        

      </Routes>
    </BrowserRouter>
  );
}
