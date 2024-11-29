import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 7777,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
};
