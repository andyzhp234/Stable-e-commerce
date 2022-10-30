import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import cors from 'cors'


dotenv.config()
connectDB()

const server = express();

// accept json data in req body
server.use(express.json());

// server.use(express.urlencoded({extended: false}));

server.use(cors());

server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);
server.use('/api/orders', orderRoutes);

server.get('', (req,res) => {
  res.send('API RUNNING!')
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});