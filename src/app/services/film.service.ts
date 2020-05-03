import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { Observable, of } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

const FILMS:Film[] =[

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




}
