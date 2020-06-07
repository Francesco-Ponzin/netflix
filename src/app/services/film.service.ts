import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { Observable, of } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';





@Injectable({
  providedIn: 'root'
})

export class FilmService {

  selectedFilm: Film;
  newFilm: Film = {
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


  constructor(private userService: UserService, private http: HttpClient) {
  }



  getFilms(): Observable<Film[]> {

    return this.http.get<Film[]>("http://netflix.cristiancarrino.com/film/read.php").pipe(
      tap(response => this.films = response,

      )
    );

  }

  addFilm() {


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })

    };



    this.http.post<Film[]>("http://netflix.cristiancarrino.com/film/create.php", this.newFilm, httpOptions).subscribe(response => {
      this.http.get<Film[]>("http://netflix.cristiancarrino.com/film/read.php").subscribe(response => this.films = response);

      console.log(response);
    });

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







  }

  editFilm() {


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })
    };

    this.http.post<Film[]>("http://netflix.cristiancarrino.com/film/update.php", this.selectedFilm, httpOptions).subscribe((resp) => {
      this.http.get<Film[]>("http://netflix.cristiancarrino.com/film/read.php").subscribe(response => this.films = response);
      console.log(resp);
    }

    );
    this.selectedFilm = null;



  }

  deleteFilm(toDelete: Film) {

    toDelete.createdBy = -1;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })
    };
    this.http.post<Film[]>("http://netflix.cristiancarrino.com/film/delete.php", { "id": toDelete.id }, httpOptions).subscribe(response2 => {
      this.http.get<Film[]>("http://netflix.cristiancarrino.com/film/read.php").subscribe(response => this.films = response);

      console.log(response2);
    });


  }

  getLastFilms(films: Film[]): Observable<Film[]> {
    return of(films.reverse().slice(0, 4));

  }

  getTopFilms(films: Film[]): Observable<Film[]> {
    return of(films.sort(function (b, a) { return a.stars - b.stars }).slice(0, 3));
  }

  setStars(film: Film, stars: number) {
    if (this.userService.loggedUser && this.userService.loggedUser.id == film.createdBy ) {
      film.stars = stars;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.userService.getLoggedUser().token
        })
      };
  
      this.http.post<Film[]>("http://netflix.cristiancarrino.com/film/update.php", film, httpOptions).subscribe((resp) => {
        this.http.get<Film[]>("http://netflix.cristiancarrino.com/film/read.php").subscribe(response => this.films = response);
        console.log(resp);
      }
  
      );
    }
  }

  isStarring(film: Film, actor: Actor): boolean {
    for (let item of film.cast) {
      if (item.id === actor.id) {
        return true;
      }
    }
    return false;
  }

  removeActor(film: Film, actor: Actor) {
    for (let i = 0; i < film.cast.length; i++) {
      if (film.cast[i].id === actor.id) {
        film.cast.splice(i, 1);
      }
    }
  }

  addActor(film: Film, actor: Actor) {

    film.cast.push(actor);

  }

  toggleActor(film: Film, actor: Actor) {
    let found = false;
    for (let i = 0; i < film.cast.length; i++) {
      if (film.cast[i].id === actor.id) {
        film.cast.splice(i, 1);
        found = true;
      }
    }
    if (!found) {
      film.cast.push(actor);
    }
  }

  hasGenre(film: Film, genre: Genre): boolean {
    for (let item of film.genres) {
      if (item.id === genre.id) {
        return true;
      }
    }
    return false;
  }


  removeGenre(film: Film, genre: Genre) {
    for (let i = 0; i < film.genres.length; i++) {
      if (film.genres[i].id === genre.id) {
        film.genres.splice(i, 1);
      }
    }
  }

  addGenre(film: Film, genre: Genre) {

    film.genres.push(genre);

  }

  toggleGenre(film: Film, genre: Genre) {
    let found = false;
    for (let i = 0; i < film.genres.length; i++) {
      if (film.genres[i].id === genre.id) {
        film.genres.splice(i, 1);
        found = true;
      }
    }
    if (!found) {
      film.genres.push(genre);
    }
  }


}
