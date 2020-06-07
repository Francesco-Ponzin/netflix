import { Component, OnInit } from '@angular/core';
import { ActorService } from '../services/actor.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  constructor(public actorService: ActorService) { }

  ngOnInit(): void {
  }

}
