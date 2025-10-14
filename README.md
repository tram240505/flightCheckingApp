** Flight Checking App -Phase 2 **
Tasks and Features Implemented

1. Data Structure

- Designed data structure for flights based on CSV dataset.
- Created flights.json in data/ folder to store sample flight data.
- Converted CSV dataset to JSON .

2. Modular Architecture
   modules/
   flights/
   models/
   flightModel.js
   routes/
   flightRoutes.js
   middlewares/
   flightValidation.js

- Each module handles:
  -- models/ => Business logic (CRUD)
  -- routes/ => Router endpoints for each entity
  -- middlewares/ => Input validation for POST/PUT requests

3. Application-Level Middlewares

- express.json() and express.urlencoded({extended: true}) for parsing request bodies
- 404 Not Found handler: Respond when a route does not exist
- Error-handling middleware: Logs the error and returns a 500 response

4. Flight Model

- getAllFlights() => Fetch all records
- getFlightByCode(flightCode) =>Fetch a single record by flight code
- addNewFlight(data) => Add a new flight
- updateFlight(flightCode, data) => Update flight info
  -deleteFlight(flightCode) => Delete a flight

5. Flight Routes

- GET /flights => Get all flights
- GET /flights/:code => Get flight by flight code
- POST /flights =>Add new flight
- PUT /flights/:code => Update flight
- DELETE /flights/:code => Delete flight

6. Validation Middleware

- used express-validator
- check required fields and constraints

7. HTTP Response Handling

- 200 OK → Successful GET/PUT/DELETE
- 201 Created → Successful POST
- 400 Bad Request → Validation errors
- 404 Not Found → Flight not found
- 500 Internal Server Error → Server errors
