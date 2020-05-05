import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {

  constructor(public filmService: FilmService) { }

  ngOnInit(): void {
  }

}
