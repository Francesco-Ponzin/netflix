import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {

  constructor(public filmService: FilmService) { }

  ngOnInit(): void {
  }

}
