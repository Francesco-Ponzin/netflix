import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from 'ngx-webstorage';
import { Film } from '../models/film';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const USERS: User[] = [
  {
    id: 1,
    firstname: "Francesco",
    lastname: "Ponzin",
    favoritesFilm: [],
    username: "wilson",
    password: "passwd"
  },
  {
    id: 1,
    firstname: "Cristian",
    lastname: "Carrino",
    favoritesFilm: [],
    username: "cri",
    password: "fitness"
  },
]

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
    this.loggedUser = this.localStorage.retrieve("user");
    return of(this.loggedUser);
  }

  isFavorite(film: Film): boolean {
    if (this.loggedUser !== null) {
      for (let favorite of this.loggedUser.favoritesFilm) {
        if (film.id === favorite.id) {
          return true;
        }
      }
    }

    return false;
  }

  addFavorite(film: Film): void {
    this.loggedUser.favoritesFilm.push(film);
    this.localStorage.store("user", this.loggedUser);
  }

  removeFavorite(film: Film): void {
    this.loggedUser.favoritesFilm = this.loggedUser.favoritesFilm.filter(x => x !== film);
    this.localStorage.store("user", this.loggedUser);
  }

}
