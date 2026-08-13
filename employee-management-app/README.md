Employee Management System
===========================

A complete employee management application built with AngularJS, Node.js/TypeScript backend, and SQL Server database.

Project Structure
=================

```
employee-management-app/
├── database/
│   └── employee_table.sql          # SQL script for database setup
├── frontend/
│   ├── index.html                  # Main HTML file
│   ├── js/
│   │   ├── app.js                  # Angular app module
│   │   ├── controllers/
│   │   │   └── employeeController.js  # Employee controller
│   │   └── services/
│   │       └── employeeService.js     # Employee service
│   └── css/
│       └── styles.css              # Custom styles
└── backend/
    ├── src/
    │   ├── server.ts               # Express server
    │   ├── database.ts             # Database connection
    │   ├── controllers/
    │   │   └── employeeController.ts  # Business logic
    │   ├── routes/
    │   │   └── employees.ts        # API routes
    │   └── middleware/
    │       └── validation.ts       # Request validation
    ├── package.json
    ├── tsconfig.json
    └── .env.example
```

Prerequisites
=============

1. **Node.js** (v14 or higher)
2. **SQL Server** (SQL Server 2019 or higher)
3. **npm** (comes with Node.js)
4. A modern web browser

Setup Instructions
==================

### 1. Database Setup

1. Connect to SQL Server using SQL Server Management Studio or SQL Server Command Line Tools
2. Open and run the SQL script:
   ```
   database/employee_table.sql
   ```
   This will create the EmployeeDB database with the Employees table and sample data.

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory with your database credentials:

```
PORT=3000
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=YourPassword123
DB_NAME=EmployeeDB
DB_PORT=1433
```

For development with auto-reload:

```bash
npm run dev-watch
```

Or compile and run:

```bash
npm run build
npm start
```

The API will be available at: `http://localhost:3000`

### 3. Frontend Setup

The frontend is a static AngularJS application. You can serve it using:

**Using Python (if installed):**
```bash
# Python 3.x
cd frontend
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

**Using Live Server (VS Code Extension):**
- Open the frontend folder in VS Code
- Right-click on index.html and select "Open with Live Server"

The frontend will be available at: `http://localhost:8000`

Features
========

✓ View all employees in a table format
✓ Add new employees via modal popup
✓ Edit existing employee information
✓ Delete employees (soft delete)
✓ Real-time data validation
✓ Responsive Bootstrap UI
✓ RESTful API backend
✓ CRUD operations with error handling
✓ Professional UI with Font Awesome icons

API Endpoints
=============

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all active employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee (soft delete) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |

Request/Response Examples
=========================

### Create Employee

**Request:**
```json
POST /api/employees
Content-Type: application/json

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Phone": "555-0101",
  "Department": "IT",
  "Position": "Senior Developer",
  "Salary": 85000,
  "HireDate": "2020-01-15"
}
```

**Response:**
```json
{
  "message": "Employee created successfully",
  "EmployeeID": 1
}
```

### Get All Employees

**Request:**
```
GET /api/employees
```

**Response:**
```json
[
  {
    "EmployeeID": 1,
    "FirstName": "John",
    "LastName": "Doe",
    "Email": "john.doe@company.com",
    "Phone": "555-0101",
    "Department": "IT",
    "Position": "Senior Developer",
    "Salary": 85000.00,
    "HireDate": "2020-01-15",
    "IsActive": 1,
    "CreatedDate": "2024-01-15T10:30:00Z",
    "UpdatedDate": "2024-01-15T10:30:00Z"
  },
  ...
]
```

### Update Employee

**Request:**
```json
PUT /api/employees/1
Content-Type: application/json

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john.doe@company.com",
  "Phone": "555-0101",
  "Department": "IT",
  "Position": "Principal Developer",
  "Salary": 95000,
  "HireDate": "2020-01-15"
}
```

**Response:**
```json
{
  "message": "Employee updated successfully"
}
```

### Delete Employee

**Request:**
```
DELETE /api/employees/1
```

**Response:**
```json
{
  "message": "Employee deleted successfully"
}
```

Technology Stack
================

**Frontend:**
- AngularJS 1.8.2
- Bootstrap 4.6.2
- Font Awesome 6.0.0
- jQuery 3.6.0

**Backend:**
- Node.js
- Express.js
- TypeScript
- MSSQL
- CORS
- Express-validator

**Database:**
- Microsoft SQL Server
- T-SQL

Troubleshooting
===============

### Database Connection Error

**Problem:** Cannot connect to SQL Server

**Solution:**
1. Verify SQL Server is running
2. Check server name and credentials in `.env`
3. Ensure database `EmployeeDB` exists
4. Run the SQL script if database is missing

### Frontend Cannot Connect to API

**Problem:** CORS errors or 404 errors when calling API

**Solution:**
1. Ensure backend is running on port 3000
2. Check API base URL in `employeeService.js`
3. Verify CORS is enabled in backend
4. Check browser console for detailed errors

### Port Already in Use

**Problem:** Port 3000 or 8000 is already in use

**Solution:**
```bash
# Find process using the port (Windows)
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Or use a different port
# Edit .env for backend or use -p flag for http-server
```

Future Enhancements
===================

- [ ] User authentication and authorization
- [ ] Role-based access control
- [ ] Department management
- [ ] Attendance tracking
- [ ] Salary management
- [ ] Employee performance reviews
- [ ] Document management
- [ ] Email notifications
- [ ] Export to Excel/PDF
- [ ] Advanced search and filtering
- [ ] Dashboard with statistics

License
=======

MIT License - Feel free to use this project for educational and commercial purposes.

Support
=======

For issues or questions, please check the code comments or refer to the documentation in each module.

---

**Created:** 2024
**Version:** 1.0.0
