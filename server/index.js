import express from 'express';
import Connection from './database/db.js';
const app = express();

app.get('/', (req, res)=>{
    res.send("Hello!")
})

const PORT = 8000;
app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
})
Connection();