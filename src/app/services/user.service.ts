import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from 'ngx-webstorage';
import { Film } from '../models/film';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User;

  constructor(private localStorage: LocalStorageService, private http: HttpClient) { }

  login(username: string, password: string) {


    let myuser = {
      "username": username,
      "password": password
    }


    this.http.post<User>("http://netflix.cristiancarrino.com/user/login.php", myuser).subscribe(response => {
      console.log(response);

      this.loggedUser = response;

      if (this.loggedUser.favorite_films) {
        this.loggedUser.favoritesFilm = this.loggedUser.favorite_films.split(",");
      }


      if (!this.loggedUser.favoritesFilm) {
        this.loggedUser.favoritesFilm = [];
      }

      this.localStorage.store("user", this.loggedUser);


    });



  }

  logout() {
    this.loggedUser = null;
    this.localStorage.clear("user");
  }

  getLoggedUser() {

    if (!this.loggedUser) {
      this.loggedUser = this.localStorage.retrieve("user");
    }

    return this.loggedUser;
  }

  isFavorite(film: Film): boolean {
    if (this.loggedUser !== null) {
      for (let favorite of this.loggedUser.favoritesFilm) {
        if (film.id.toString() === favorite) {
          return true;
        }
      }
    }

    return false;
  }

  addFavorite(film: Film): void {
    this.loggedUser.favoritesFilm.push(film.id.toString());
    this.localStorage.store("user", this.loggedUser);

    this.updateFavorite();

  }

  removeFavorite(film: Film): void {
    this.loggedUser.favoritesFilm = this.loggedUser.favoritesFilm.filter(x => x !== film.id.toString());
    this.localStorage.store("user", this.loggedUser);
    this.updateFavorite();
  }

  updateFavorite(): void {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.loggedUser.token
      })
    };
    this.http.post<any[]>("http://netflix.cristiancarrino.com/user/favorite-films.php", { "ids": this.loggedUser.favoritesFilm.toString() }, httpOptions).subscribe(response2 => {

      console.log(this.loggedUser.favoritesFilm.toString());
      console.log(response2);

    });

  }

}
