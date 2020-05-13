import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username:string = "";
  password:string="";

  lastFilms: Film[];
  topFilms: Film[];


  constructor(public filmService: FilmService, public userService:UserService) { }

  ngOnInit(): void {
    this.filmService.getLastFilms().subscribe(films => this.lastFilms = films);

    this.filmService.getTopFilms().subscribe(films => this.topFilms = films);

  }

  login():void{
  
    this.userService.login(this.username, this.password);
  }

}
