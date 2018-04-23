import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdvertComponent } from 'app/components/advert/advert.component';
import { Observable } from 'rxjs';
import "rxjs/add/observable/of";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  emittedName;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    // first time
    if(!localStorage.getItem("OCMSNoAdvert"))
    {
      this.showAdvert();
    } 
    else { // been here before
      let expirationDate = new Date(+localStorage.getItem("OCMSNoAdvert"));
      if(new Date() > expirationDate) 
      {
        this.showAdvert();
      }
    }
  }

  showAdvert() {
    const dialogRef = this.dialog.open(AdvertComponent, {
      height: '80%'
    }); 
    
    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem("OCMSNoAdvert", new Date().setDate(new Date().getDate() + 1) + ''); // one day expiration
    });

    dialogRef.backdropClick().subscribe(event => {
      console.log(event);
      console.log("button clicked");
    });
  }

}
