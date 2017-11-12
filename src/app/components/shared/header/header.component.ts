import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean;
  isLoggedIn: boolean;
  user: Observable<User>;


  constructor(private authService: AuthService) { 
    this.user = this.authService.user; // not logged in = null
  }

  ngOnInit() {
  }

}
