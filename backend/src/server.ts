import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import wishRoutes from './routes/wish.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

// Load environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wish-help')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/wishes', wishRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 