import { Component, OnInit } from '@angular/core';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[];
  user: User;

  constructor(private userService: UserService,public genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
    this.userService.getLoggedUser().subscribe(user => this.user = user);

  }

  edit(genre:Genre){
    this.genreService.selectedGenre = genre;
  }

}
