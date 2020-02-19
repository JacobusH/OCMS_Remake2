import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean = false;

  isIn = false;
  state: string = 'in';


  constructor(private authService: AuthService) { 
    
  }

  ngOnInit() {
    this.authService.afAuth.authState.subscribe(user => {
      if(user) {
          this.isLoggedIn = true;
      }
      else {
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
