import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { Observable, of } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

const FILMS: Film[] = [
  {
    id: 1,
    title: "Apocalypse Now",
    description: "Il miglior adattamento cinematografico di Cuore di Tenebra",
    director: "Francis Ford Coppola",
    duration: "2h 33m",
    releaseYear: 1979,
    stars: 8,
    cast: [
      {
        firstname: "Marlon",
        lastname: "Brando"
      }
    ],
    genres: [
      {
        name: "Avventura"
      }
    ],
    tags: "tags"
  },
  {
    id: 2,
    title: 'Fratello, dove sei? ',
    description: 'La Un misterioso uomo delle legge dà la caccia a tre detenuti evasi che viaggiano attraverso gli Stati Uniti alla ricerca della refurtiva di un vecchio colpo. di una ragazza assassinata scrive un controverso messaggio su alcuni cartelloni pubblicitari, aprendo una contesa che vede coinvolti lo stimato capo della polizia e un pericoloso poliziotto.',
    director: 'Martin Ethan Coen, Joel Coen',
    duration: '106 min',
    releaseYear: 2000,
    stars: 5,
    cast: [
      {
        id: 6,
        firstname: 'George',
        lastname: 'Clooney'
      }
    ],
    genres: [
      {
        name: 'avventura',
      },
      {
        name: 'commedia',
      }
    ],
    tags: 'hollywood, clooney',
  },
  {
    id: 3,
    title: "Inside Out",
    description: "Una ragazzina è alle prese col trasloco: città nuova, amici nuovi, sport nuovi",
    director: " Pete Docter, Ronnie Del Carmen",
    duration: "1h 35min",
    releaseYear: 2015,
    stars: 10,
    cast: [],
    genres: [],
    tags: "psichiatria"
  }
]


@Injectable({
  providedIn: 'root'
})

export class FilmService {

  selectedFilm: Film;
  newFilm: Film =  {
    title: "titolo",
    description: "descrizione",
    director: "regista",
    duration: "durata",
    releaseYear: 1895,
    stars: 3,
    cast: [],
    genres: [],
    tags: "tags"
  };
  films: Film[];


  constructor(private localStorage: LocalStorageService) {
  }

  saveInLocalStorage() {
    this.localStorage.store("films", this.films);
  }

  getFilms(): Observable<Film[]> {
    this.films = this.localStorage.retrieve("films") || FILMS;
    return of(this.films);
  }

  addFilm() {
    this.films.push(this.newFilm);
    this.newFilm = {
      title: "titolo",
      description: "descrizione",
      director: "regista",
      duration: "durata",
      releaseYear: 1895,
      stars: 3,
      cast: [],
      genres: [],
      tags: "tags"
    };
    this.saveInLocalStorage();
  }

  editFilm() {
    this.selectedFilm = null;
    this.saveInLocalStorage();
  }

  deleteFilm(toDelete: Film){
    for (let i = 0; i < this.films.length; i++) {
      if(this.films[i] == toDelete){
        this.films.splice(i,1);
      }
    }
    this.saveInLocalStorage();

  }

  getLastFilms() : Observable<Film[]>{
    this.films = this.localStorage.retrieve("films") || FILMS;
    return of(this.films.reverse().slice(0,4));
    
  }

  getTopFilms() : Observable<Film[]>{
    this.films = this.localStorage.retrieve("films") || FILMS;
    return of(this.films.sort( function(b, a){return a.stars-b.stars}).slice(0,3));
  }

}
