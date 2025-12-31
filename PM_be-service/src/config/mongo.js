import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => console.log('✅ MongoDB connected'));
db.on('error', (err) => console.error('❌ MongoDB connection error:', err));

export default db;

// mongodb://localhost:27017/