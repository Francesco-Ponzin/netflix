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
    lastname:"Turturro"
  }

]



@Injectable({
  providedIn: 'root'
})

export class ActorService {

  selectedActor: Actor;
  newActor: Actor;
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

  addActor(actor: Actor) {
    this.actors.push(actor);
    this.saveInLocalStorage();
  }

  editActor() {
    this.selectedActor = null;
    this.saveInLocalStorage();
  }
}
