import { Router } from "express";
import fs from 'node:fs';
import {validate, partialMovie} from '../zod.js';
export const router = Router();

const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

function save(object){
    fs.writeFileSync('./movies.json', JSON.stringify(object, null, 4));
}

router.get('/', (req, res)=>{
    res.json(movies);
});

router.get('/:id', (req, res)=>{
    const {id} = req.params;
    const found = movies.find(movie => movie.id === parseInt(id));

    if(found){
        res.json(found);
    }else{
        res.status(404).json('The movie wasnt found');
    }
})

router.post('/', (req, res)=>{
    const result = validate(req.body);

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    let id = movies.at(-1);
    let identity=0;
    if(id==undefined){
        identity = 1
    }else{
        identity = id.id + 1
    }

    const newMovie  = {
        id: identity,
        ...result.data
    }

    movies.push(newMovie);
    save(movies);
    res.json(newMovie);
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const index = movies.findIndex(movie => movie.id === parseInt(id));

    if(index != -1){
        res.json(movies[index]);
        movies.splice(index, 1);
        save(movies);
    }else{
        res.status(404).json('no se enccontro');
    }
})

router.put('/:id',(req, res)=>{
    const {id} = req.params;
    const result = partialMovie(req.body);

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }
    
    let index = movies.findIndex(mo=>mo.id === parseInt(id));
    if(index != -1){
        const movie  = {
        ...movies[index],
        ...result.data
        }

        movies[index]=movie;

        save(movies);
        res.json(movie);
    }
})