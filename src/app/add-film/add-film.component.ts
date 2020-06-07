import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';
import { ActorService } from '../services/actor.service';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  actors: Actor[];
  genres: Genre[];
  constructor(public filmService: FilmService, public actorService: ActorService, public genreService: GenreService) { }

  ngOnInit(): void {
    this.actorService.getActors().subscribe(actors => this.actors = actors);
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
  }

}
