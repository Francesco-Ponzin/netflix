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

  constructor(public filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(films => this.films = films);
  }

  edit(film:Film){
    this.filmService.selectedFilm = film;
  }


}
