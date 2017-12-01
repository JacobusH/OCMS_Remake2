import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user.model';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {
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
