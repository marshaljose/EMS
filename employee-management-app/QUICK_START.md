# Quick Start Guide - Employee Management System

## 📋 Step-by-Step Setup

### Prerequisites Checklist
- [ ] Node.js installed (v14+) - [Download](https://nodejs.org/)
- [ ] SQL Server installed (2019+) or SQL Express
- [ ] VS Code or your favorite editor
- [ ] Git (optional)

---

## 🗄️ Step 1: Database Setup

### Windows with SQL Server Management Studio

1. **Open SQL Server Management Studio**
   - Connect to your local SQL Server instance
   - Default server: `localhost` or `(local)`

2. **Run the SQL Script**
   - Right-click on "Databases" → Select "New Query"
   - Open and copy the contents of `database/employee_table.sql`
   - Paste into the query window
   - Click "Execute" (F5)

3. **Verify Database Creation**
   ```sql
   USE EmployeeDB;
   SELECT COUNT(*) as EmployeeCount FROM Employees;
   ```
   You should see 5 sample employees.

### Using SQL Command Line

```cmd
# Connect to SQL Server
sqlcmd -S localhost -U sa -P YourPassword

# Create database
:read database/employee_table.sql
GO
```

---

## 🔧 Step 2: Backend Setup

### 1. Navigate to Backend Directory
```bash
cd employee-management-app/backend
```

### 2. Create Environment File
Create a `.env` file in the backend directory:

```
PORT=3000
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=YourPassword123
DB_NAME=EmployeeDB
DB_PORT=1433
```

**Note:** Update the credentials to match your SQL Server setup.

### 3. Install Dependencies
```bash
npm install
```

This installs:
- express (web framework)
- mssql (database driver)
- cors (cross-origin requests)
- express-validator (input validation)
- typescript & ts-node (development)

### 4. Start Backend Server

**For Development (with auto-reload):**
```bash
npm run dev-watch
```

**For Production:**
```bash
npm run build
npm start
```

### 5. Verify Backend is Running
Open your browser and navigate to:
```
http://localhost:3000/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Employee Management API is running"
}
```

---

## 🎨 Step 3: Frontend Setup

### Option A: Using Python (Recommended)

```bash
cd employee-management-app/frontend

# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

### Option B: Using Node.js

```bash
# Install globally (one-time)
npm install -g http-server

cd employee-management-app/frontend
http-server -p 8000
```

### Option C: Using Live Server (VS Code)

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Access the Application

Open your browser and navigate to:
```
http://localhost:8000
```

---

## 🎯 Testing the Application

### Test Add Employee
1. Click "Add New Employee"
2. Fill in the form:
   - First Name: `Jane`
   - Last Name: `Smith`
   - Email: `jane.smith@company.com`
   - Phone: `555-1234`
   - Department: `Marketing`
   - Position: `Manager`
   - Salary: `75000`
   - Hire Date: `2024-01-01`
3. Click "Add Employee"
4. You should see a success message

### Test Edit Employee
1. Find any employee in the table
2. Click the "Edit" button
3. Modify the fields
4. Click "Update Employee"

### Test Delete Employee
1. Click the "Delete" button on any employee
2. Confirm the deletion
3. The employee should be removed from the table

---

## 🔗 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Example API Calls (using cURL)

**Get All Employees:**
```bash
curl http://localhost:3000/api/employees
```

**Create Employee:**
```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"FirstName":"Test","LastName":"User","Email":"test@example.com","Department":"IT","Salary":50000}'
```

**Update Employee:**
```bash
curl -X PUT http://localhost:3000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"FirstName":"Updated","LastName":"Name","Email":"updated@example.com","Department":"IT","Salary":60000}'
```

**Delete Employee:**
```bash
curl -X DELETE http://localhost:3000/api/employees/1
```

---

## ❌ Troubleshooting

### Backend Won't Start

**Error:** "Error: connect ECONNREFUSED 127.0.0.1:1433"

**Solution:**
1. Verify SQL Server is running
2. Check connection string in `.env`
3. Test connection:
   ```bash
   sqlcmd -S localhost -U sa -P YourPassword
   ```

### Frontend Shows "Cannot Get /"

**Error:** 404 Not Found

**Solution:**
1. Make sure you're in the `frontend` directory
2. Restart the server
3. Clear browser cache (Ctrl+Shift+Delete)

### "Port 3000 already in use"

**Solution (Windows):**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution (Mac/Linux):**
```bash
lsof -i :3000
kill -9 <PID>
```

Or use a different port by editing `.env`:
```
PORT=3001
```

### CORS Error in Browser Console

**Error:** "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution:**
1. Verify backend is running
2. Check API URL in `employeeService.js`
3. Ensure backend CORS middleware is active

### Database Connection Failed

**Verify SQL Server:**
```bash
# Check if SQL Server is listening
telnet localhost 1433

# Test with SQL Server Management Studio
# Or test connection in backend with:
npm run dev
```

---

## 📁 Project File Structure

```
employee-management-app/
│
├── database/
│   └── employee_table.sql
│       ├── Employees table definition
│       ├── Stored procedures for CRUD
│       └── Sample data
│
├── frontend/
│   ├── index.html               # Main UI
│   ├── js/
│   │   ├── app.js              # Angular module
│   │   ├── controllers/
│   │   │   └── employeeController.js
│   │   └── services/
│   │       └── employeeService.js
│   └── css/
│       └── styles.css
│
├── backend/
│   ├── src/
│   │   ├── server.ts           # Express app & routes
│   │   ├── database.ts         # DB connection
│   │   ├── controllers/
│   │   │   └── employeeController.ts
│   │   ├── routes/
│   │   │   └── employees.ts
│   │   └── middleware/
│   │       └── validation.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── README.md
├── QUICK_START.md              # This file
└── .gitignore
```

---

## 🚀 Next Steps

1. **Customize UI** - Edit `frontend/css/styles.css`
2. **Add Validation** - Enhance `backend/src/middleware/validation.ts`
3. **Add Authentication** - Implement JWT tokens
4. **Add Logging** - Integrate Winston or Morgan
5. **Deploy** - Use Azure, AWS, or Heroku

---

## 📚 Useful Resources

- [AngularJS Documentation](https://angularjs.org/)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SQL Server Docs](https://docs.microsoft.com/sql/)
- [Bootstrap 4 Docs](https://getbootstrap.com/docs/4.6/)

---

## 🎉 You're All Set!

Your Employee Management System is ready to use. Happy coding! 🚀

For detailed information, see the main [README.md](README.md) file.
