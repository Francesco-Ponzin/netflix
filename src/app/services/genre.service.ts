import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';

const GENRES: Genre[] = [
  {
    name: "commedia"
  },
  {
    name: "traggedia"
  },
  {
    name: "animazione"
  },
  {
    name: "western"
  },
  {
    name: "fantascienza"
  },
  {
    name: "drammatico"
  },
  {
    name: "comico"
  },
  {
    name: "fantasy"
  },
  {
    name: "cerebrale"
  },
  {
    name: "storico"
  },
  {
    name: "romantico"
  }
]


@Injectable({
  providedIn: 'root'
})


export class GenreService {

  selectedGenre: Genre;
  newGenre: Genre;
  genres: Genre[];


  constructor(private localStorage: LocalStorageService) {
  }

  saveInLocalStorage() {
    this.localStorage.store("genres", this.genres);
  }

  getGenres(): Observable<Genre[]> {
    this.genres = this.localStorage.retrieve("genres") || GENRES;
    return of(this.genres);
  }

  addGenre(genre: Genre) {
    this.genres.push(genre);
    this.saveInLocalStorage();
  }

  editGenre() {
    this.selectedGenre = null;
    this.saveInLocalStorage();
  }
}
