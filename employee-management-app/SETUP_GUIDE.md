# Employee Management System - Setup Guide

## 📦 Project Overview

This is a complete **Employee Management System** with:
- ✅ SQL Server database with employee table
- ✅ AngularJS frontend with UI for CRUD operations
- ✅ Node.js/TypeScript backend API

---

## 🚀 Quick Commands

### Setup Backend
```bash
cd backend
npm install
# Configure .env file with your database credentials
npm run dev-watch
```

### Setup Frontend
```bash
cd frontend
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: VS Code Live Server (right-click index.html)
```

### Setup Database
1. Open SQL Server Management Studio
2. Run: `database/employee_table.sql`

---

## 📁 File Structure

```
employee-management-app/
│
├── README.md                    # Comprehensive documentation
├── QUICK_START.md               # Step-by-step setup guide
├── .gitignore                   # Git ignore rules
│
├── database/
│   └── employee_table.sql       # SQL script for DB setup
│
├── frontend/
│   ├── index.html               # Main HTML (with Angular)
│   ├── js/
│   │   ├── app.js              # Angular app initialization
│   │   ├── controllers/
│   │   │   └── employeeController.js    # Main controller
│   │   └── services/
│   │       └── employeeService.js       # HTTP service
│   └── css/
│       └── styles.css           # Custom styles
│
└── backend/
    ├── package.json             # NPM dependencies
    ├── tsconfig.json            # TypeScript config
    ├── README.md                # Backend documentation
    ├── .env.example             # Environment template
    │
    └── src/
        ├── server.ts            # Express server & routes
        ├── database.ts          # Database connection
        ├── controllers/
        │   └── employeeController.ts    # Business logic
        ├── routes/
        │   └── employees.ts     # API routes
        └── middleware/
            └── validation.ts    # Input validation
```

---

## 🔌 API Endpoints

All endpoints run on `http://localhost:3000`

### Employees Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Fetch all employees |
| GET | `/api/employees/:id` | Fetch by ID |
| POST | `/api/employees` | Create new |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Soft delete |

### Health Check
- **GET** `/health` - API status

---

## 🗂️ Database Schema

### Employees Table

| Column | Type | Constraints |
|--------|------|-------------|
| EmployeeID | INT | PRIMARY KEY, AUTO INCREMENT |
| FirstName | NVARCHAR(50) | NOT NULL |
| LastName | NVARCHAR(50) | NOT NULL |
| Email | NVARCHAR(100) | NOT NULL, UNIQUE |
| Phone | NVARCHAR(20) | NULL |
| Department | NVARCHAR(50) | NULL |
| Position | NVARCHAR(50) | NULL |
| Salary | DECIMAL(10,2) | NULL |
| HireDate | DATE | NULL |
| IsActive | BIT | DEFAULT 1 |
| CreatedDate | DATETIME | DEFAULT GETDATE() |
| UpdatedDate | DATETIME | DEFAULT GETDATE() |

**Indexes:**
- `IX_Email` on Email column
- `IX_Department` on Department column

**Stored Procedures:**
- `sp_GetAllEmployees` - Fetch active employees
- `sp_GetEmployeeByID` - Fetch by ID
- `sp_InsertEmployee` - Create new
- `sp_UpdateEmployee` - Update existing
- `sp_DeleteEmployee` - Soft delete

---

## 💻 Frontend Features

### UI Components
- **Header Navigation** - Branding and description
- **Action Buttons** - Add, Refresh
- **Employee Table** - Displays all employees with sorting
- **Modal Form** - Add/Edit popup
- **Action Buttons per Row** - Edit, Delete
- **Alert Messages** - Success/Error notifications

### Data Binding
- Two-way binding with `ng-model`
- Repeater with `ng-repeat`
- Conditional rendering with `ng-if`
- Click handlers with `ng-click`
- Form validation with Angular forms

### Styling
- Bootstrap 4.6.2 for layout
- Font Awesome 6.0 for icons
- Custom CSS for polish
- Responsive design (mobile-friendly)

---

## ⚙️ Backend Features

### Express Server
- CORS middleware enabled
- JSON request/response handling
- Error handling middleware
- Logging middleware
- Graceful shutdown (SIGINT, SIGTERM)

### Database Connection
- MSSQL connection pool
- Automatic reconnection
- Connection timeout handling
- Secure connection options

### Validation
- Input validation with express-validator
- Email format validation
- Email uniqueness check
- Required field validation
- Numeric validation for salary

### Error Handling
- 404 for not found
- 400 for validation errors
- 500 for server errors
- Descriptive error messages
- Console logging for debugging

---

## 🔐 Security Features

✓ Input validation
✓ Email uniqueness
✓ SQL injection prevention (parameterized queries)
✓ CORS enabled
✓ Error message sanitization
✓ Soft delete (data retention)

---

## 📋 Sample Data

5 sample employees are created in the database:

1. **John Doe** - Senior Developer (IT) - $85,000
2. **Jane Smith** - HR Manager (HR) - $75,000
3. **Michael Johnson** - Financial Analyst (Finance) - $65,000
4. **Sarah Williams** - QA Engineer (IT) - $60,000
5. **Robert Brown** - Sales Manager (Sales) - $70,000

---

## 🧪 Testing Workflow

1. **Load Page** - All employees display
2. **Add Employee** - Click "Add New Employee" → Fill form → Submit
3. **Edit Employee** - Click "Edit" → Modify → Submit
4. **Delete Employee** - Click "Delete" → Confirm
5. **Refresh** - Click "Refresh" to reload from API

---

## 🛠️ Development Notes

### Frontend
- Uses AngularJS 1.8.2 (stable version)
- No build process required
- Direct file serving recommended
- API URL: `http://localhost:3000/api/employees`

### Backend
- Uses Express.js with TypeScript
- Requires compilation: `npm run build`
- Source files in `src/` directory
- Compiled files in `dist/` directory
- Development mode: `npm run dev-watch` (requires ts-node)

### Database
- SQL Server 2019 or later
- T-SQL stored procedures
- Can be replaced with any SQL-compatible database

---

## 📝 Notes

- **Soft Delete**: Deleted employees are marked inactive, not actually removed
- **Email Unique**: System prevents duplicate emails
- **CORS Enabled**: Frontend and backend can communicate
- **Stateless API**: Each request is independent
- **Environment Variables**: Use `.env` for configuration

---

## ✅ Verification Checklist

- [ ] SQL Server running
- [ ] Database created (EmployeeDB)
- [ ] Employee table exists
- [ ] Sample data loaded
- [ ] Backend dependencies installed
- [ ] .env file configured
- [ ] Backend running (port 3000)
- [ ] Frontend served (port 8000)
- [ ] Can view employees in browser
- [ ] Can add new employee
- [ ] Can edit employee
- [ ] Can delete employee

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| DB connection fails | Check SQL Server is running, verify credentials in .env |
| CORS error | Ensure backend is running on port 3000 |
| Port already in use | Kill existing process or change port number |
| Employee not showing | Check API response in browser DevTools Network tab |
| Modal not appearing | Ensure Bootstrap JS is loaded in HTML |
| Validation error | Check required fields are filled in form |

---

## 📞 Support Resources

- **AngularJS Docs**: https://angularjs.org/
- **Express.js Guide**: https://expressjs.com/
- **TypeScript Handbook**: https://www.typescriptlang.org/
- **SQL Server Docs**: https://docs.microsoft.com/sql/
- **Bootstrap 4 Docs**: https://getbootstrap.com/

---

**Ready to use! Follow QUICK_START.md for step-by-step instructions.** 🚀
