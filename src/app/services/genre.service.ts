import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})


export class GenreService {

  selectedGenre: Genre;
  newGenre: Genre = {
    name: ""
  };
  genres: Genre[] = [];


  constructor(private userService: UserService, private http: HttpClient) {
  }



  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>("http://netflix.cristiancarrino.com/genre/read.php");

  }

  addGenre() {
    this.genres.push(this.newGenre);

    this.userService.getLoggedUser().subscribe(response => {

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })

      };

      console.log(response.username);

      this.http.post<Genre>("http://netflix.cristiancarrino.com/genre/create.php", this.newGenre, httpOptions).subscribe(response => {

        console.log(response);
      });
      this.newGenre = {
        name: ""
      }

    });

  }

  editGenre() {

    this.userService.getLoggedUser().subscribe(response => {

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })

      };

      this.http.post<Genre>("http://netflix.cristiancarrino.com/genre/update.php", this.selectedGenre, httpOptions).subscribe(response => {

        console.log(response);
      });
      this.selectedGenre = null;


    });

  }


  deleteGenre(toDelete: Genre) {


    this.userService.getLoggedUser().subscribe(response => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': response.token
        })
      };
      this.http.post<Genre[]>("http://netflix.cristiancarrino.com/genre/delete.php", { "id": toDelete.id }, httpOptions).subscribe(response2 => {

        console.log(response2);
      });
    })

  }
}
