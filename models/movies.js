import fs from 'node:fs';
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

function save(object){
    fs.writeFileSync('./movies.json', JSON.stringify(object, null, 4));
}

export class modelMovies{
    static getAll(){
        return movies;
    }

    static getById({id}){
        const found = movies.find(movie => movie.id === parseInt(id));
        if(found){
            return found;
        }else{
            return null;
        }
    }

    static create({movie}){
        let id = movies.at(-1);
        let identity=0;
        if(id==undefined){
            identity = 1
        }else{
            identity = id.id + 1
        }

        const newMovie  = {
            id: identity,
            ...movie
        }

        movies.push(newMovie);
        save(movies);
        return newMovie;
    }

    static delete({id}){
        const index = movies.findIndex(movie => movie.id === parseInt(id));

        if(index != -1){
            const deleted = movies[index];
            movies.splice(index, 1);
            save(movies);
            return deleted;
        }else{
            return null;
        }
    }

    static update({id, movie}){
        let index = movies.findIndex(mo=>mo.id === parseInt(id));
        if(index != -1){
            const modified = {
                ...movies[index],
                ...movie
            }
            movies[index] = modified;
            save(movies);
            return modified;
        }else{
            return null;
        }
    }
}