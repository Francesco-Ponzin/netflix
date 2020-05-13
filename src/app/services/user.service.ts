import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from 'ngx-webstorage';

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

  constructor(private localStorage: LocalStorageService) { }

  login(username: string, password: string) {

    for (let user of USERS) {
      if (user.username === username && user.password === password){
        this.loggedUser = user;
      }
    } 

    this.localStorage.store("user", this.loggedUser);
  }

  logout() {
    this.loggedUser = null;
    this.localStorage.clear("user");
  }

  getLoggedUser() {
    this.loggedUser = this.localStorage.retrieve("user");
    return this.loggedUser;
  }

}
