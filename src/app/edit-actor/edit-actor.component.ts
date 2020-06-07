import { Component, OnInit } from '@angular/core';
import { ActorService } from '../services/actor.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(public actorService: ActorService) { }

  ngOnInit(): void {
  }

}
