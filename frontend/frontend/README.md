# Flight Checking App – Phase 4

## Overview

Flight Checking App allows users to search for flights between cities with options to sort by price, duration, stops, or days left. The app supports autocomplete for city inputs to enhance user experience. This phase focuses solely on **searching flights** and displaying results.

## Features Implemented in Phase 4

1. **Flight Search**

   - Users can search flights based on:
     - Source city
     - Destination city
   - Supports sorting by:
     - Price
     - Duration
     - Days left
     - Number of stops
   - Supports ascending and descending sort order.

2. **Autocomplete for City Input**

   - As users type in the "From city" or "To city" input fields, suggestions appear.
   - Suggestions include both source and destination cities available in the database.
   - Selecting a suggestion populates the input field.

3. **Frontend Display**

   - Flight results display:
     - Flight name and airline
     - Departure and arrival times
     - Stops
     - Class
     - Duration
     - Days left
     - Price
   - Sorting options are applied immediately on the frontend.

4. **Backend API**
   - `GET /flights/cities` – returns list of cities matching the search term for autocomplete.
   - `GET /flights` – returns flights based on search filters, sorting, and pagination.
   - `GET /flights/:id` – returns details of a single flight (optional, for future use).
   - CRUD operations (create, update, delete flights) are not included, as the app focuses on searching and displaying flights only.
