import sql from 'mssql';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config: sql.config = {
    server: process.env.DB_SERVER || 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER || 'sa',
            password: process.env.DB_PASSWORD || 'password'
        }
    },
    options: {
        database: process.env.DB_NAME || 'EmployeeDB',
        encrypt: false,
        trustServerCertificate: true,
        useUTC: true,
        connectTimeout: 60000,
        requestTimeout: 60000
    }
};

let pool: sql.ConnectionPool;

export async function initializeDB(): Promise<void> {
    try {
        pool = new sql.ConnectionPool(config);
        await pool.connect();
        console.log('✓ Database connection established');
    } catch (error) {
        console.error('✗ Database connection failed:', error);
        throw error;
    }
}

export function getPool(): sql.ConnectionPool {
    if (!pool) {
        throw new Error('Database not initialized. Call initializeDB first.');
    }
    return pool;
}

export async function closeDB(): Promise<void> {
    if (pool) {
        await pool.close();
        console.log('✓ Database connection closed');
    }
}
