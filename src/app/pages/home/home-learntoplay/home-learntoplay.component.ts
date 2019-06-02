import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-learntoplay',
  templateUrl: './home-learntoplay.component.html',
  styleUrls: ['./home-learntoplay.component.css']
})
export class HomeLearntoplayComponent implements OnInit {
  ltpInsts = ["Piano", "Guitar", "Violin", "Singing", "Drums", "Bass"
              , "Cello", "Ukulele"]

  constructor() { }

  ngOnInit() {
  }

}
