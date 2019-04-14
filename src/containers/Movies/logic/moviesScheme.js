    
import {schema} from 'normalizr';

export const movies = new schema.Entity(
    'byId',
    {},
    {
        idAttribute: '_id'
    }
);

export const arrayOfMovies = new schema.Array(movies);