import { Component, OnInit } from '@angular/core';
import { ActorService } from '../services/actor.service';
import { Actor } from '../models/actor';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {


  constructor(public userService: UserService, public actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getActors().subscribe();
    this.actorService.actors;
  }

  edit(actor: Actor) {
    this.actorService.selectedActor = actor;
  }

  deleteActor(actor: Actor) {
    this.actorService.deleteActor(actor);
 
  }

}
