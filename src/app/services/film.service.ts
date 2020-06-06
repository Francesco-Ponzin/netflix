import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { Observable, of } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';





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


  constructor( private userService: UserService, private http: HttpClient) {
  }



  getFilms(): Observable<Film[]> {

    return this.http.get<Film[]>("http://netflix.cristiancarrino.com/film/read.php").pipe(
      tap(response => console.log(response),

      )
    );

  }

  addFilm() {

    this.userService.getLoggedUser().subscribe(response => {

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })

      };



      this.http.post<Film[]>("http://netflix.cristiancarrino.com/film/create.php", this.newFilm, httpOptions).subscribe(response => {

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


    })




  }

  editFilm() {

    this.userService.getLoggedUser().subscribe(response => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })
      };

      this.http.post<Film[]>("http://netflix.cristiancarrino.com/film/update.php", this.selectedFilm, httpOptions).subscribe(response2 => {

        console.log(response2);
      });
      this.selectedFilm = null;

      /*
      this.selectedFilm = null;
      this.saveInLocalStorage();
  
      */

    })



  }

  deleteFilm(toDelete: Film) {


    this.userService.getLoggedUser().subscribe(response => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })
      };
      this.http.post<Film[]>("http://netflix.cristiancarrino.com/film/delete.php", { "id": toDelete.id }, httpOptions).subscribe(response2 => {

        console.log(response2);
      });
    })


  }

  getLastFilms(films: Film[]): Observable<Film[]> {
    return of(films.reverse().slice(0, 4));

  }

  getTopFilms(films: Film[]): Observable<Film[]> {
    return of(films.sort(function (b, a) { return a.stars - b.stars }).slice(0, 3));
  }

  setStars(film: Film, stars: number) {
    if (this.userService.loggedUser) {
      film.stars = stars;

      //TODO
    }
  }

}
