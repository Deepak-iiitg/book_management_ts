import 'dotenv/config';
import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnection from './src/models/dbConnection';
const PORT = process.env.PORT;
console.log(PORT);
const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

import logger from "./src/utils/logger";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


dbConnection();

import authRoutes from './src/routes/authRoutes';
import bookRoutes from './src/routes/bookRoutes';
import errorHandler from './src/middleware/errorHandler';
app.use('/api',authRoutes);
app.use('/api/book',bookRoutes);
app.use(errorHandler);
app.listen(PORT,()=>{console.log('server running on port 8080')})
