import { Component, OnInit } from '@angular/core';
import { ActorService } from '../services/actor.service';
import { Actor } from '../models/actor';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actors: Actor[];
  user: User;

  constructor(private userService: UserService, public actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getActors().subscribe(actors => {
    this.actors = actors; console.log(this.actors);
    });
    this.userService.getLoggedUser().subscribe(user => this.user = user);
  }

  edit(actor: Actor) {
    this.actorService.selectedActor = actor;
  }

}
