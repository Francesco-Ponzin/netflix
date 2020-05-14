import { Component, OnInit, Input } from '@angular/core';
import { faStar as faStarSolid, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';


@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  starOne = faStarSolid;
  starHalf = faStarHalfAlt;
  starZero = faStarRegular;
  @Input() film:Film;
  values = [2,4,6,8,10];

  constructor(public filmService: FilmService) { }

  ngOnInit(): void {
  }

}
