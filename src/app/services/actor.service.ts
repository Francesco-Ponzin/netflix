import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

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


  constructor( private userService: UserService, private http: HttpClient) {
  }



  getActors(): Observable<Actor[]> {

    return this.http.get<Actor[]>("http://netflix.cristiancarrino.com/actor/read.php");
  }

  addActor() {

    this.userService.getLoggedUser().subscribe(response => {

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })

      };

      console.log(response.username);
      
      this.http.post<Actor>("http://netflix.cristiancarrino.com/actor/create.php", this.newActor, httpOptions).subscribe(response => {

        console.log(response);
      });
      this.newActor = {
        firstname: "",
        lastname: ""
      }

    });

  }

  editActor() {

    this.userService.getLoggedUser().subscribe(response => {

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })

      };

      this.http.post<Actor>("http://netflix.cristiancarrino.com/actor/update.php", this.selectedActor, httpOptions).subscribe(response => {

        console.log(response);
      });

    this.selectedActor = null;

    });

  }

  deleteActor(toDelete: Actor) {

    this.userService.getLoggedUser().subscribe(response => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })
      };
      this.http.post<Actor[]>("http://netflix.cristiancarrino.com/actor/delete.php", { "id": toDelete.id }, httpOptions).subscribe(response2 => {

        console.log(response2);
      });
    })




  }
}
