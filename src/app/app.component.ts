import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvertComponent } from 'app/components/advert/advert.component';
import { AdvertService } from 'app/services/advert.service';
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
  windowWidth: number;

  constructor(public dialog: MatDialog
          , public advertService: AdvertService) {

  }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    // localStorage.removeItem("OCMSNoAdvert");

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

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  showAdvert() {
    this.advertService.advertsActive.valueChanges().subscribe(adverts => {
      if(adverts.length > 0) {

        // console.log("advert", adverts)

        let height = 'auto';
        if(this.windowWidth > 500) {
          height = '98%';
        }

        const dialogRef = this.dialog.open(AdvertComponent, {
          height: height,
          width: 'unset',
          panelClass: 'ad-pane'
        });

        dialogRef.afterClosed().subscribe(result => {
          localStorage.setItem("OCMSNoAdvert", new Date().setDate(new Date().getDate() + 1) + ''); // one day expiration
        });

        dialogRef.backdropClick().subscribe(event => {
          console.log(event);
          console.log("button clicked");
        });
      }
    })
  }

}
