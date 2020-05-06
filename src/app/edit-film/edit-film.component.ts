import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActorService } from '../services/actor.service';
import { GenreService } from '../services/genre.service';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {

  actors: Actor[];
  genres: Genre[];

  constructor(public filmService: FilmService, public actorService: ActorService, public genreService: GenreService) { }

  ngOnInit(): void {
    this.actorService.getActors().subscribe(actors => this.actors = actors);
    this.genreService.getGenres().subscribe(genres => this.genres = genres);

  }

}
