const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/routes');

const database = require('./config/database');

const server = express();
dotenv.config();
server.use(cors());
server.use(express.json());

server.use(userRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})


