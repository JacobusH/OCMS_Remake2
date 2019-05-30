import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  host: {'style': 'display:flex; flex:1; flex-direction:column; justify-self:stretch;'}
})
export class AdministrationComponent implements OnInit {
  screenWidth: number; 

  constructor() { 
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    
  }

}
