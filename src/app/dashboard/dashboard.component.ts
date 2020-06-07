import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string = "";
  password: string = "";

  lastFilms: Film[];
  topFilms: Film[];


  constructor(private filmService: FilmService, public userService: UserService) { }

  ngOnInit(): void {

    this.filmService.getFilms().subscribe(response => {
      this.filmService.getLastFilms(response).subscribe(films => this.lastFilms = films);
      this.filmService.getTopFilms(response).subscribe(films => this.topFilms = films);

    })



  }

  login(): void {

    this.userService.login(this.username, this.password);
  }

}
