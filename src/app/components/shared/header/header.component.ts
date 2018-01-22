import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService, UserService } from 'app/services/_index';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user.model';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: Observable<User>;

  isIn = false;
  state: string = 'in';
  currentUser: any;


  constructor(private authService: AuthService, private userService: UserService, private route: Router) { 
    this.user = this.authService.user; // not logged in = null
    if(this.user) {
      this.isLoggedIn = true;
      this.user.subscribe(u => {
        if(u.roles['admin']) {
          this.isAdmin = true;
        }
      })
    }
  }

  ngOnInit() {
    this.authService.authstate.subscribe(user => {
      if(user) {
          this.user = user;
          this.userService.users.doc(user.uid).valueChanges().subscribe(x => {
            var us = x as User;
            if(us.roles['admin']) {
              this.isLoggedIn = true;
            }
          })

          
          // this.isAdmin = this.af.getUserRoles(user);
          // console.log("Logged in user is: " + user.email);
          // console.log("User photo: " + user.providerData[0].photoURL);
          // console.log("User name: " + user.providerData[0].displayName);
          // console.log(user);
      }
      else {
        this.user = null;
        this.isLoggedIn = false;
      }
    });

    
    
  }

  toggleState() {
    // this.isIn = !this.isIn;
    let bool = this.isIn;
    this.isIn = bool === false ? true : false; 
  }

  logout() {
    this.authService.logout();
  }

}
