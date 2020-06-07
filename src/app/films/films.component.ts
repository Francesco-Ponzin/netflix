import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  title = "elenco film";

  filteredFilms: Film[];
  searchTask;



  constructor(public filmService: FilmService, public userService :UserService) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(films => {this.filteredFilms = films;
    });

  }

  edit(film: Film) {
    this.filmService.selectedFilm = film;
  }

  search(event) {

    clearTimeout(this.searchTask);

    if (event.target.value.length > 2) {
      this.searchTask = setTimeout(() => {
        this.filteredFilms = this.filmService.films.filter(x => x.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
      }, 300)

    } else {
      this.searchTask = setTimeout(() => {
        this.filteredFilms = this.filmService.films;
      }, 300)
    }

  }


}
