import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import Router from './routes/route.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: true, credentials: true }));

app.use('/', Router);

// Middleware to use req.body
app.use(express.json());

const PORT = 8000;
app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
})
Connection();