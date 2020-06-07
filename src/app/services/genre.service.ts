import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})


export class GenreService {

  selectedGenre: Genre;
  newGenre: Genre = {
    name: ""
  };
  genres: Genre[];


  constructor(private userService: UserService, private http: HttpClient) {
  }



  getGenres(): Observable<Genre[]> {
    if (this.genres) {
      return of(this.genres);
    }
    return this.http.get<Genre[]>("http://netflix.cristiancarrino.com/genre/read.php").pipe(
      tap(response => this.genres = response));;

  }

  addGenre() {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })

    };


    this.http.post<Genre>("http://netflix.cristiancarrino.com/genre/create.php", this.newGenre, httpOptions).subscribe(response => {

      this.http.get<Genre[]>("http://netflix.cristiancarrino.com/genre/read.php").subscribe(response => this.genres = response);

    });
    this.newGenre = {
      name: ""
    }



  }

  editGenre() {


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })

    };

    this.http.post<Genre>("http://netflix.cristiancarrino.com/genre/update.php", this.selectedGenre, httpOptions).subscribe(response => {

      this.http.get<Genre[]>("http://netflix.cristiancarrino.com/genre/read.php").subscribe(response => this.genres = response);
    });
    this.selectedGenre = null;


  }


  deleteGenre(toDelete: Genre) {

    toDelete.createdBy = "garbageCollector";


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getLoggedUser().token
      })
    };
    this.http.post<Genre[]>("http://netflix.cristiancarrino.com/genre/delete.php", { "id": toDelete.id }, httpOptions).subscribe(response2 => {

      this.http.get<Genre[]>("http://netflix.cristiancarrino.com/genre/read.php").subscribe(response => this.genres = response);
    });

  }
}
