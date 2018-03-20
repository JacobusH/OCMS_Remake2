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
  itemArr: Array<RaveTodoItem> = new Array;
  itemObby: Observable<RaveTodoItem[]>;
  emittedName;

  constructor(public dialog: MatDialog) {
    let item1:RaveTodoItem = {
      title: "title1",
      description: "desc1",
      state: RaveTodoItemEnum.InProgress,
      priority: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    let item2:RaveTodoItem = {
      title: "title2",
      description: "desc2",
      state: RaveTodoItemEnum.Testing,
      priority: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.itemArr.push(item1, item2);

    this.itemObby = Observable.of(this.itemArr);
    
  }

  ngOnInit() {
    // first time
    if(!localStorage.getItem("OCMSNoAdvert"))
    {
      this.showAdvert();
    } 
    else { // been here before
      let expirationDate = new Date(localStorage.getItem("OCMSNoAdvert"));
      if(new Date() > expirationDate) 
      {
        this.showAdvert();
      }
    }
  }

  showAdvert() {
    const dialogRef = this.dialog.open(AdvertComponent, {
      // height: '350px'
    }).afterClosed().subscribe(result => {
      localStorage.setItem("OCMSNoAdvert", new Date().setDate(new Date().getDate() + 7) + ''); // one week expiration
    });
  }

}

export interface RaveTodoItem {
  title: string;
  description?: string;
  state: RaveTodoItemEnum;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}
export enum RaveTodoItemEnum {
  NotStarted = 0,
  InProgress = 1,
  UnderReview = 2,
  Testing = 3,
  Finished = 4,
}
