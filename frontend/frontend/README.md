# Flight Checking & Booking App

## Phase 5 – CPAN 212 / CPAN 214

✔ User authentication (Register → Login → OTP verification)  
✔ JWT authorization  
✔ Role-based access (User vs Admin)  
✔ Flight search + sorting  
✔ Flight booking  
✔ View booked flights  
✔ Admin panel to add flights

This Phase 5 includes complete CRUD, protected routes, and form validations.

---

## 1. Features Implemented (Phase 5 Requirements)

### **User Features**

- Register new account
- Login + OTP Verification
- JWT token stored in frontend
- Search flights (autocomplete + sorting)
- Book a flight
- View “My Bookings” page

### **Admin Features**

- Only admin can access `/admin`
- Add new flights with validation
- Error messages for missing fields
- Admin protected by JWT + role middleware

### **Security**

- Password hashing using bcrypt
- OTP
- JWT-based authorization
- Protected routes on both backend + frontend

### **Frontend (React)**

- React Router
- ProtectedRoute component
- BookingPage page
- MyBooking page
- AdminPanel
- FlightChecking search UI
- Login
- Register
- VerifyOtp

---
