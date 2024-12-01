import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug('Using .env.example file to supply config environment variables');
  dotenv.config({ path: '.env.example' });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const SECRET_KEY = process.env['SECRET_KEY'] || '';

if (!SECRET_KEY) {
  logger.error('No client secret. Set SECRET_KEY environment variable.');
  process.exit(1);
}
