import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { Observable, of } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

const FILMS:Film[] =[
  {
  id: 1,
  title: "titolo",
  description: "descrizione",
  director: "regista",
  duration: "durata",
  releaseYear: 1895,
  stars: 3,
  cast: [],
  genres: [],
  tags: "tags"
  }
]


@Injectable({
  providedIn: 'root'
})

export class FilmService {

  selectedFilm: Film;
  newFilm: Film;
  films: Film[];

  
  constructor(private localStorage:LocalStorageService) { 
    this.films = this.localStorage.retrieve("films") || FILMS;
  }

  saveInLocalStorage(){
    this.localStorage.store("films", this.films);
  }

  getFilms(): Observable<Film[]> {
      return of(this.films);
  }

  addFilm(film:Film){
    this.films.push(film);
    this.saveInLocalStorage();
  }

  editFilm(){
    this.selectedFilm = null;
    this.saveInLocalStorage();
  }
}
