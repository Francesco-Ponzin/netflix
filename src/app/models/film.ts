import { Actor } from './actor';
import { Genre } from './genre';

export interface Film {
    id?: number;
    title: string;
    description: string;
    director: string;
    duration: string;
    releaseYear: number;
    stars: number;
    cast: Actor[];
    genres: Genre[];
    tags: string;
}