import { Component, OnInit } from '@angular/core';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[];

  constructor(public genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
  }

  edit(genre:Genre){
    this.genreService.selectedGenre = genre;
  }

}
