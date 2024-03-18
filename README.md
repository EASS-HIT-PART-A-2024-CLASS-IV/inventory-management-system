# inventory-management-system
The Inventory Management System is designed to streamline the process of managing stock, sales, and transactions.
This repository holds the backend and frontend of the web application. The front end being a react app that allows users
to interact the available products, check the current stock and the history of sales.
The backend is a fastAPI app, with CRUD functionality for several API's, it handles the data using MongoDB.

<img width="691" alt="image" src="https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/inventory-management-system/assets/39120397/e3cfafb5-8810-4c07-b2e0-10eff7260090">


## API Endpoints:
### Products
- `GET /products` - Retrieve all products
- `POST /products` - Add a new product
- `GET /products/{id}` - Retrieve a single product by ID
- `PUT /products/{id}` - Update a product by ID
- `DELETE /products/{id}` - Delete a product by ID

### Sales
- `GET /sales` - Retrieve all sales records
- `POST /sales` - Record a new sale
- `GET /sales/{id}` - Retrieve a sale record by ID

### Transactions
- `GET /transactions` - Retrieve all transactions
- `POST /transactions` - Record a new transaction
- `GET /transactions/{id}` - Retrieve a transaction by ID

## Features:
- Viewing and editing the available products
- A Stock dashboard for tracking the available products stock
- A sales dashboad for transaction tracking

## Technologies used:
- Backend: FastAPI
- Frontend: React
- DB: MongoDB
- Containerization: Docker

## Pre-requisits:
- Docker is installed oon the system

## Setup instructions:
  1. Clone the repository to your local machine:
     
     `git clone https://github.com/IlyaMich/inventory-management-system.git`
     
  2. Navigate to the project directory:
     
     `cd inventory-management-system`
     
  3. Build and run the containers using Docker Compose:
     
     `docker-compose up --build`
     
  4. The application should now be running and accessible. Use the API endpoints to interact with the system.
     you can access the fronend on: `http://http://localhost:3000/` and the backend APIs at: `http://localhost:8000/api/v1`
     
  5. To stop the application and remove the containers, run the command:
      
     `docker-compose down`

## Short demo:
https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/inventory-management-system/assets/39120397/f3dcaa9e-b258-45d8-9c30-49ca085addca


