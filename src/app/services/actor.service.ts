import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';

const ACTORS:Actor[] =[

]



@Injectable({
  providedIn: 'root'
})

export class ActorService {

  selectedActor: Actor;
  newActor: Actor;
  actors: Actor[];

  
  constructor(private localStorage:LocalStorageService) { 
    this.actors = this.localStorage.retrieve("actors") || ACTORS;
  }

  saveInLocalStorage(){
    this.localStorage.store("actors", this.actors);
  }

  getActors(): Observable<Actor[]> {
      return of(this.actors);
  }

  addActor(actor:Actor){
    this.actors.push(actor);
    this.saveInLocalStorage();
  }
}
