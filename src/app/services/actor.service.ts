import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';



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


  constructor(private userService: UserService, private http: HttpClient) {
  }



  getActors(): Observable<Actor[]> {

    if (this.actors){
      return of(this.actors);
    }

    return this.http.get<Actor[]>("http://netflix.cristiancarrino.com/actor/read.php").pipe(
      tap(response => this.actors = response));
    
  }

  addActor() {


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })

    };


    this.http.post<Actor>("http://netflix.cristiancarrino.com/actor/create.php", this.newActor, httpOptions).subscribe(response => {

      this.http.get<Actor[]>("http://netflix.cristiancarrino.com/actor/read.php").subscribe(response => this.actors = response);

  });
    this.newActor = {
      firstname: "",
      lastname: ""
    }


  }

  editActor() {


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })

    };

    this.http.post<Actor>("http://netflix.cristiancarrino.com/actor/update.php", this.selectedActor, httpOptions).subscribe(response => {

      this.http.get<Actor[]>("http://netflix.cristiancarrino.com/actor/read.php").subscribe(actors => this.actors = actors);
    });

    this.selectedActor = null;


  }

  deleteActor(toDelete: Actor) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })
    };
    this.http.post<Actor[]>("http://netflix.cristiancarrino.com/actor/delete.php", { "id": toDelete.id }, httpOptions).subscribe(response2 => {

      this.http.get<Actor[]>("http://netflix.cristiancarrino.com/actor/read.php").subscribe(actors => this.actors = actors);
    });

  }
}
