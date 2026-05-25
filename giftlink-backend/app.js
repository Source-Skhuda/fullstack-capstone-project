/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectToDatabase = require('./models/db');
const {loadData} = require("./util/import-mongo/index");
const pinoHttp = require('pino-http');
const logger = require('./logger');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();
const port = 3060;

// Connect to DB once
connectToDatabase()
    .then(() => logger.info('Connected to DB'))
    .catch((e) => logger.error('Failed to connect to DB', e));

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

// Route files
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRouter);

// Root
app.get("/",(req,res)=>{
    res.send("Inside the server");
});

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
