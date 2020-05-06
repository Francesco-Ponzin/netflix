import { Component, OnInit } from '@angular/core';
import { ActorService } from '../services/actor.service';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actors: Actor[];

  constructor(public actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getActors().subscribe(actors => this.actors = actors);

  }

  edit(actor: Actor) {
    this.actorService.selectedActor = actor;
  }

}
