import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import tripRoutes from './routes/tripRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/trips', tripRoutes);

app.get('/api', (_req, res) => {
  res.json({ message: 'Travel Website API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
