import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDB, closeDB } from './database';
import employeesRouter from './routes/employees';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/employees', employeesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Employee Management API is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        message: 'Internal server error', 
        error: errorMessage 
    });
});

// Start server
async function startServer() {
    try {
        // Initialize database connection
        await initializeDB();
        
        // Start listening
        app.listen(PORT, () => {
            console.log(`\n╔════════════════════════════════════════╗`);
            console.log(`║ Employee Management API                ║`);
            console.log(`║ Server running on port ${PORT}           ║`);
            console.log(`║ URL: http://localhost:${PORT}             ║`);
            console.log(`║ Health: http://localhost:${PORT}/health   ║`);
            console.log(`╚════════════════════════════════════════╝\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    await closeDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\nTerminating...');
    await closeDB();
    process.exit(0);
});

startServer();
