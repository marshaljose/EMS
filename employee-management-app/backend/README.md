# Employee Management Backend API

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the backend directory:

```
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=YourPassword
DB_NAME=EmployeeDB
DB_PORT=1433
API_PORT=3000
```

## Development

Run with auto-reload:
```bash
npm run dev-watch
```

## Production

Build and run:
```bash
npm run build
npm start
```

## API Endpoints

### Employees

- **GET /api/employees** - Get all employees
- **GET /api/employees/:id** - Get employee by ID
- **POST /api/employees** - Create new employee
- **PUT /api/employees/:id** - Update employee
- **DELETE /api/employees/:id** - Delete employee

## Database

Run the SQL script to setup the database:
```
database/employee_table.sql
```
