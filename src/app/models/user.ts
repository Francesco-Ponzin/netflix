import { Film } from './film';

export interface User{
    id?: number;
    firstname: string;
    lastname: string;
    favoritesFilm?: string[];
    favorite_films?: string;
    username:string;
    password: string;
    token?:string;
}