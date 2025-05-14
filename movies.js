
import express from 'express';
import cors from 'cors';
const app = express();
import { router } from './routes/movies.js';

app.use(express.json());
app.use(cors());
app.use('/movies', router);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=>{
    console.log('localhost running on link http://localhost:'+PORT);
})
