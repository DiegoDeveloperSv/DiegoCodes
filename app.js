
import express from 'express';
import {corsSchema} from './middlewares/cors.js';
const app = express();
import { router } from './routes/movies.js';

app.use(express.json());
app.use(corsSchema())
app.use('/movies', router);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=>{
    console.log('localhost running on link http://localhost:' + PORT);
})
