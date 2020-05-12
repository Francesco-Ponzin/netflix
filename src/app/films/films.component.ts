import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  title = "elenco film";

  films: Film[];
  filteredFilms: Film[];
  searchTask;
  constructor(public filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(films => this.films = films);
    this.filteredFilms = this.films;
  }

  edit(film: Film) {
    this.filmService.selectedFilm = film;
  }

  search(event) {

    clearTimeout(this.searchTask);

    if (event.target.value.length > 2) {
      this.searchTask = setTimeout(() => {
        this.filteredFilms = this.films.filter(x => x.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
      }, 300)

    } else {
      this.searchTask = setTimeout(() => {
        this.filteredFilms = this.films;
      }, 300)
    }

  }


}
