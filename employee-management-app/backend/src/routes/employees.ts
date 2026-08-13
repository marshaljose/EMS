import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';
import { validateEmployee } from '../middleware/validation';

const router = Router();

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Get employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Create new employee
router.post('/', validateEmployee, employeeController.createEmployee);

// Update employee
router.put('/:id', validateEmployee, employeeController.updateEmployee);

// Delete employee
router.delete('/:id', employeeController.deleteEmployee);

export default router;
