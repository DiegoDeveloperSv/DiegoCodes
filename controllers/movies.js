import { modelMovies } from "../models/movies.js";
import {validate, partialMovie} from '../zod.js';

export class movieController{
    static get = (req, res)=>{
        const movies = modelMovies.getAll();
        res.json(movies);
    }

    static getById = (req, res)=>{
        const {id} = req.params;
        const found = modelMovies.getById({id});
        if(found){
            res.json(found);
        }else{
            res.status(404).json('The movie wasnt found');
        }
    }

    static create = (req, res)=>{
        const result = validate(req.body);
        if(result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }
        const newMovie = modelMovies.create({movie: result.data});
        res.json(newMovie);
    }

    static delete = (req, res)=>{
        const {id} = req.params;
        if(id){
            const deleted = modelMovies.delete({id});
            if(deleted != null){
                res.json(deleted);
            }else{
                res.status(404).json('The movie was not found');
            }
        }else{
            res.status(400).json('The id is required');
        }
    }

    static update = (req, res)=>{
        const {id} = req.params;
        const result = partialMovie(req.body);
        if(result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }
        const modified = modelMovies.update({id, movie: result.data});
        if(modified != null){
            res.json(modified);
        }else{
            res.status(404).json('The movie was not found');
        }
    }
}