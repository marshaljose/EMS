-- Create Employee Management Database
-- SQL Script for Employee Table

-- Create Database (if not exists)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'EmployeeDB')
BEGIN
    CREATE DATABASE EmployeeDB;
END
GO

-- Use the database
USE EmployeeDB;
GO

-- Create Employee Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Employees')
BEGIN
    CREATE TABLE Employees (
        EmployeeID INT PRIMARY KEY IDENTITY(1,1),
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        Email NVARCHAR(100) NOT NULL UNIQUE,
        Phone NVARCHAR(20),
        Department NVARCHAR(50),
        Position NVARCHAR(50),
        Salary DECIMAL(10, 2),
        HireDate DATE,
        IsActive BIT DEFAULT 1,
        CreatedDate DATETIME DEFAULT GETDATE(),
        UpdatedDate DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create Index for better query performance
CREATE INDEX IX_Email ON Employees(Email);
CREATE INDEX IX_Department ON Employees(Department);
GO

-- Insert Sample Data
INSERT INTO Employees (FirstName, LastName, Email, Phone, Department, Position, Salary, HireDate, IsActive)
VALUES 
    ('John', 'Doe', 'john.doe@company.com', '555-0101', 'IT', 'Senior Developer', 85000.00, '2020-01-15', 1),
    ('Jane', 'Smith', 'jane.smith@company.com', '555-0102', 'HR', 'HR Manager', 75000.00, '2019-03-22', 1),
    ('Michael', 'Johnson', 'michael.johnson@company.com', '555-0103', 'Finance', 'Financial Analyst', 65000.00, '2021-06-10', 1),
    ('Sarah', 'Williams', 'sarah.williams@company.com', '555-0104', 'IT', 'QA Engineer', 60000.00, '2022-02-01', 1),
    ('Robert', 'Brown', 'robert.brown@company.com', '555-0105', 'Sales', 'Sales Manager', 70000.00, '2018-11-05', 1);
GO

-- Create stored procedures for CRUD operations
-- Get All Employees
CREATE PROCEDURE sp_GetAllEmployees
AS
BEGIN
    SELECT * FROM Employees WHERE IsActive = 1 ORDER BY EmployeeID DESC;
END
GO

-- Get Employee by ID
CREATE PROCEDURE sp_GetEmployeeByID
    @EmployeeID INT
AS
BEGIN
    SELECT * FROM Employees WHERE EmployeeID = @EmployeeID;
END
GO

-- Insert Employee
CREATE PROCEDURE sp_InsertEmployee
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Email NVARCHAR(100),
    @Phone NVARCHAR(20),
    @Department NVARCHAR(50),
    @Position NVARCHAR(50),
    @Salary DECIMAL(10, 2),
    @HireDate DATE
AS
BEGIN
    INSERT INTO Employees (FirstName, LastName, Email, Phone, Department, Position, Salary, HireDate, IsActive)
    VALUES (@FirstName, @LastName, @Email, @Phone, @Department, @Position, @Salary, @HireDate, 1);
    SELECT SCOPE_IDENTITY() AS EmployeeID;
END
GO

-- Update Employee
CREATE PROCEDURE sp_UpdateEmployee
    @EmployeeID INT,
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Email NVARCHAR(100),
    @Phone NVARCHAR(20),
    @Department NVARCHAR(50),
    @Position NVARCHAR(50),
    @Salary DECIMAL(10, 2),
    @HireDate DATE
AS
BEGIN
    UPDATE Employees 
    SET FirstName = @FirstName, 
        LastName = @LastName, 
        Email = @Email, 
        Phone = @Phone,
        Department = @Department,
        Position = @Position,
        Salary = @Salary,
        HireDate = @HireDate,
        UpdatedDate = GETDATE()
    WHERE EmployeeID = @EmployeeID;
END
GO

-- Delete Employee (Soft Delete)
CREATE PROCEDURE sp_DeleteEmployee
    @EmployeeID INT
AS
BEGIN
    UPDATE Employees 
    SET IsActive = 0, UpdatedDate = GETDATE()
    WHERE EmployeeID = @EmployeeID;
END
GO
