** Flight Checking App -Phase 3 **
Tasks and Features Implemented

Project Overview
This project is a Flight Checking API built with **Node.js Express, and MongoDB Atlas**.  
In Phase 3, the application has been integrated with a real database (MongoDB), using **Mongoose** for models and CRUD operations. Features include searching, sorting, pagination, and input validation.

2. Modular Architecture
   modules/
   flights/
   models/
   flightModel.js
   routes/
   flightRoutes.js
   middlewares/
   flightValidation.js
   shared/
   connect-db.js
   .env

- Each module handles:
  -- models/ => Business logic (CRUD)
  -- routes/ => Router endpoints for each entity
  -- middlewares/ => Input validation for POST/PUT requests

3. Application-Level Middlewares

- express.json() and express.urlencoded({extended: true}) for parsing request bodies
- 404 Not Found handler: Respond when a route does not exist
- Error-handling middleware: Logs the error and returns a 500 response

4. Database setup
   MongoDB Atlas database created for the project

- Database name: `FlightCheckingApp`
- Collection name: `flights`
- `.env` file contains the MongoDB URI:

```env
MONGO_URI='mongodb+srv://n01724490:XVelhmFgQdtMSZiC@n01724490.eeula2f.mongodb.net/?appName=n01724490'

6. Validation Middleware

- used express-validator
- check required fields and constraints

7. HTTP Response Handling

- 200 OK → Successful GET/PUT/DELETE
- 201 Created → Successful POST
- 400 Bad Request → Validation errors
- 404 Not Found → Flight not found
- 500 Internal Server Error → Server errors
```
