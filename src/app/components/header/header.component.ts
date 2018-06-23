import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService } from 'app/services/_index';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user.model';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { AnnouncementsComponent } from 'app/components/announcements/announcements.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  isIn = false;
  state: string = 'in';
  currentUser: any;


  constructor(private authService: AuthService
    , private userService: UserService
    , private route: Router
    , public dialog: MatDialog) { 
   
  }

  ngOnInit() {
    this.authService.afAuth.authState.subscribe(user => {
      if(user) {
          this.userService.users.doc(user.uid).valueChanges().subscribe(x => {
            this.isLoggedIn = true;
            var us = x as User;
            if(us.roles['admin'] === true) {
              this.isAdmin = true;
            }
          })
      }
      else {
        this.isAdmin = false;
        this.isLoggedIn = false;
      }
    });
  }

  toggleState() {
    // this.isIn = !this.isIn;
    let bool = this.isIn;
    this.isIn = bool === false ? true : false; 
  }

  showAnnouncements() {
    const dialogRef = this.dialog.open(AnnouncementsComponent, {
      height: '80%'
    }).afterClosed().subscribe(result => {
      // localStorage.setItem("OCMSNoAdvert", new Date().setDate(new Date().getDate() + 1) + ''); // one day expiration
    });
  }

  logout() {
    this.authService.logout();
  }

}
