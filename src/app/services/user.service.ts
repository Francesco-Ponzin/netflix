import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User;

  constructor(private localStorage: LocalStorageService) { }

  login() {
    this.loggedUser = {
      id: 1,
      firstname: "Cristian",
      lastname: "Carrino",
      favoritesFilm: []
    }

    this.localStorage.store("user", this.loggedUser);
  }

  logout(){
    this.loggedUser = null;
    this.localStorage.clear("user");
  }

  getLoggedUser(){
    this.loggedUser = this.localStorage.retrieve("user");
    return this.loggedUser;
  }

}
