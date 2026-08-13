import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

/**
 * Validation middleware for employee data
 */

export const validateEmployee = [
    body('FirstName').trim().notEmpty().withMessage('First name is required'),
    body('LastName').trim().notEmpty().withMessage('Last name is required'),
    body('Email').isEmail().withMessage('Valid email is required'),
    body('Phone').optional().isMobilePhone('any'),
    body('Salary').optional().isFloat({ min: 0 }),
    body('HireDate').optional().isISO8601(),
    
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ 
                message: 'Validation error',
                errors: errors.array() 
            });
            return;
        }
        next();
    }
];
