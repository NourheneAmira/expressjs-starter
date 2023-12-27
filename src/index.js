
import express from 'express'
import'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import Morgan from 'morgan'
const fs = require('fs')
const path = require('path')
import auth from './routes/auth';

import databaseConnexion from './setup/db';
//import routes

const app = express()
const port = process.env.PORT || 7000

//connect to the database
databaseConnexion()

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false, 
})

const corsOptions = {
  origin: "http://localhost:3000",
  credentials:true,
};

//enable middleware
app.use(cors(corsOptions)) 
app.use(helmet())
app.use(limiter)
app.use(Morgan('tiny'))
app.use(express.json())

// route
// fs.readdirSync(path.join(__dirname, 'routes')).map((route) => app.use('/api', require(`./routes/${route}`)))
app.use('/api',auth)

//start the app
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})