import { Request, Response } from 'express';
import sql from 'mssql';
import { getPool } from '../database';

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Unknown error';
}

/**
 * Get all employees
 */
export async function getAllEmployees(req: Request, res: Response): Promise<void> {
    try {
        const pool = getPool();
        const result = await pool
            .request()
            .query('SELECT * FROM Employees WHERE IsActive = 1 ORDER BY EmployeeID DESC');
        
        res.status(200).json(result.recordset);
    } catch (error: unknown) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ 
            message: 'Error fetching employees', 
            error: getErrorMessage(error) 
        });
    }
}

/**
 * Get employee by ID
 */
export async function getEmployeeById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const pool = getPool();
        
        const result = await pool
            .request()
            .input('EmployeeID', sql.Int, id)
            .query('SELECT * FROM Employees WHERE EmployeeID = @EmployeeID');
        
        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        
        res.status(200).json(result.recordset[0]);
    } catch (error: unknown) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ 
            message: 'Error fetching employee', 
            error: getErrorMessage(error) 
        });
    }
}

/**
 * Create new employee
 */
export async function createEmployee(req: Request, res: Response): Promise<void> {
    try {
        const { FirstName, LastName, Email, Phone, Department, Position, Salary, HireDate } = req.body;
        const pool = getPool();
        
        // Check if email already exists
        const emailCheck = await pool
            .request()
            .input('Email', sql.NVarChar(100), Email)
            .query('SELECT EmployeeID FROM Employees WHERE Email = @Email');
        
        if (emailCheck.recordset.length > 0) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        
        const result = await pool
            .request()
            .input('FirstName', sql.NVarChar(50), FirstName)
            .input('LastName', sql.NVarChar(50), LastName)
            .input('Email', sql.NVarChar(100), Email)
            .input('Phone', sql.NVarChar(20), Phone || null)
            .input('Department', sql.NVarChar(50), Department || null)
            .input('Position', sql.NVarChar(50), Position || null)
            .input('Salary', sql.Decimal(10, 2), Salary || null)
            .input('HireDate', sql.Date, HireDate || null)
            .execute('sp_InsertEmployee');
        
        res.status(201).json({ 
            message: 'Employee created successfully',
            EmployeeID: result.recordset[0].EmployeeID
        });
    } catch (error: unknown) {
        console.error('Error creating employee:', error);
        res.status(500).json({ 
            message: 'Error creating employee', 
            error: getErrorMessage(error) 
        });
    }
}

/**
 * Update employee
 */
export async function updateEmployee(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { FirstName, LastName, Email, Phone, Department, Position, Salary, HireDate } = req.body;
        const pool = getPool();
        
        // Check if employee exists
        const employeeCheck = await pool
            .request()
            .input('EmployeeID', sql.Int, id)
            .query('SELECT EmployeeID FROM Employees WHERE EmployeeID = @EmployeeID');
        
        if (employeeCheck.recordset.length === 0) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        
        // Check if email already exists (for other employees)
        const emailCheck = await pool
            .request()
            .input('Email', sql.NVarChar(100), Email)
            .input('EmployeeID', sql.Int, id)
            .query('SELECT EmployeeID FROM Employees WHERE Email = @Email AND EmployeeID != @EmployeeID');
        
        if (emailCheck.recordset.length > 0) {
            res.status(400).json({ message: 'Email already exists for another employee' });
            return;
        }
        
        await pool
            .request()
            .input('EmployeeID', sql.Int, id)
            .input('FirstName', sql.NVarChar(50), FirstName)
            .input('LastName', sql.NVarChar(50), LastName)
            .input('Email', sql.NVarChar(100), Email)
            .input('Phone', sql.NVarChar(20), Phone || null)
            .input('Department', sql.NVarChar(50), Department || null)
            .input('Position', sql.NVarChar(50), Position || null)
            .input('Salary', sql.Decimal(10, 2), Salary || null)
            .input('HireDate', sql.Date, HireDate || null)
            .execute('sp_UpdateEmployee');
        
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error: unknown) {
        console.error('Error updating employee:', error);
        res.status(500).json({ 
            message: 'Error updating employee', 
            error: getErrorMessage(error) 
        });
    }
}

/**
 * Delete employee (soft delete)
 */
export async function deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const pool = getPool();
        
        // Check if employee exists
        const employeeCheck = await pool
            .request()
            .input('EmployeeID', sql.Int, id)
            .query('SELECT EmployeeID FROM Employees WHERE EmployeeID = @EmployeeID');
        
        if (employeeCheck.recordset.length === 0) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        
        await pool
            .request()
            .input('EmployeeID', sql.Int, id)
            .execute('sp_DeleteEmployee');
        
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error: unknown) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ 
            message: 'Error deleting employee', 
            error: getErrorMessage(error) 
        });
    }
}
