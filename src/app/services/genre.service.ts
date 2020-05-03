import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';

const GENRES:Genre[] =[

]


@Injectable({
  providedIn: 'root'
})


export class GenreService {

  selectedGenre: Genre;
  newGenre: Genre;
  genres: Genre[];

  
  constructor(private localStorage:LocalStorageService) { 
    this.genres = this.localStorage.retrieve("genres") || GENRES;
  }

  saveInLocalStorage(){
    this.localStorage.store("genres", this.genres);
  }

  getGenres(): Observable<Genre[]> {
      return of(this.genres);
  }

  addGenre(genre:Genre){
    this.genres.push(genre);
    this.saveInLocalStorage();
  }
}
