import { Router } from "express";
import { movieController } from "../controllers/movies.js";
export const router = Router();

//GETALL
router.get('/', movieController.get);
//GETBYID
router.get('/:id', movieController.getById);
//CREATE
router.post('/', movieController.create);
//DELETE
router.delete('/:id', movieController.delete);
//UPDATE
router.put('/:id', movieController.update);