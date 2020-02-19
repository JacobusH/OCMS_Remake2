import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'app/models/_index';
import { UserService, AlertMultiService, AlertService, AuthService } from 'app/services/_index';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private alertMultiService: AlertMultiService,
    private userService: UserService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // googleLogin() {
  //   this.af.loginWithGoogle()
  //   .then(authData => {
  //     console.log("Google auth data");
  //     console.log(authData);
  //     this.router.navigate(['']);
  //   })
  //   .catch(err => {
  //     // this.alertService.error(err.message);
  //     this.alertMultiService.error(err.message);
  //   });
  // }

  facebookLogin() {
    this.authService.facebookLogin().then(authData => {
      console.log("Facebook auth data");
      console.log(authData);
      this.router.navigate(['']);
    })
    .catch(error => {
      console.log(error);
      // this.alertService.error(error.message);
      this.alertMultiService.error(error.message);
    });
  }

  emailLogin() {
    this.authService.emailLogin(this.model.email, this.model.password);
  }

  logout() {
    this.authService.logout();
  }


}
