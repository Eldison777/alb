import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Ensure we load the .env file from the correct location if not already loaded
// Assuming this is running from root or backend directory, we try to load strict path or default
dotenv.config();

// Create a new pool using the connection string from environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Export a query helper to keep code implementation clean
export const query = (text: string, params?: any[]) => pool.query(text, params);
