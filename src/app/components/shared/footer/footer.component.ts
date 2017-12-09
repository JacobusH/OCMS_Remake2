import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  user: Observable<User>;

  isIn = false;
  state: string = 'in';
  currentUser: any;


  constructor(private authService: AuthService) { 
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
          this.isLoggedIn = true;
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
