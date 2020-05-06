import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';

const ACTORS: Actor[] = [
  {
    firstname: "George",
    lastname: "Clooney"
  },
  {
    firstname: "John",
    lastname: "Turturro"
  },
  {
    firstname: "Marlon",
    lastname: "Brando"
  },
  {
    firstname: "Meryl",
    lastname: "Streep"
  }

]



@Injectable({
  providedIn: 'root'
})

export class ActorService {

  selectedActor: Actor;
  newActor: Actor = {
    firstname: "",
    lastname: ""
  }
  actors: Actor[];


  constructor(private localStorage: LocalStorageService) {
  }

  saveInLocalStorage() {
    this.localStorage.store("actors", this.actors);
  }

  getActors(): Observable<Actor[]> {
    this.actors = this.localStorage.retrieve("actors") || ACTORS;
    return of(this.actors);
  }

  addActor() {
    this.actors.push(this.newActor);
    this.newActor = {
      firstname: "",
      lastname: ""
    }
    this.saveInLocalStorage();
  }

  editActor() {
    this.selectedActor = null;
    this.saveInLocalStorage();
  }

  deleteActor(toDelete: Actor) {
    for (let i = 0; i < this.actors.length; i++) {
      if (this.actors[i] == toDelete) {
        this.actors.splice(i, 1);
      }
    }
    this.saveInLocalStorage();

  }
}
