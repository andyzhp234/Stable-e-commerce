import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';


// Configured .env file and Connect to MongoDB Altas
dotenv.config()
connectDB()

const server = express();

server.get('', (req,res) => {
  res.send('Express Server Up')
})

server.use(cors({
  origin: [
    "http://localhost:3000",
    // "https://checkout.stripe.com"
  ],
}));
server.use('/stripe', stripeRoutes);

// only needed when submitting with application/ x-www-form-urlencoded
// server.use(express.urlencoded({extended: false}));

// parse request body to JSON format
server.use(express.json());


server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);
server.use('/api/orders', orderRoutes);


const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});