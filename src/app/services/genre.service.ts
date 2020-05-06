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
  newGenre: Genre ={
    name: ""
  };
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

  addGenre() {
    this.genres.push(this.newGenre);
    this.newGenre = {
      name: ""
    }
    this.saveInLocalStorage();
  }

  editGenre() {
    this.selectedGenre = null;
    this.saveInLocalStorage();
  }

  deleteGenre(toDelete: Genre){
    for (let i = 0; i < this.genres.length; i++) {
      if(this.genres[i] == toDelete){
        this.genres.splice(i,1);
      }
    }
    this.saveInLocalStorage();

  }
}
