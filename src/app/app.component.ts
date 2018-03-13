import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import "rxjs/add/observable/of";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  itemArr: Array<RaveTodoItem> = new Array;
  itemObby: Observable<RaveTodoItem[]>;
  emittedName;

  constructor() {
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
