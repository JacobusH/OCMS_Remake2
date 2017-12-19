import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { provideForRootGuard } from '@angular/router/src/router_module';

@Injectable()
export class AuthService {
  user: Observable<User>;
  behUser: BehaviorSubject<User> = new BehaviorSubject(null);
  authstate: any;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UserService,
    private router: Router) { 
      this.authstate = this.afAuth.authState;

       //// Get auth data, then get firestore user document || null
       this.user = this.afAuth.authState
       .switchMap(user => {
         if (user) {
           return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          //  return this.userService.users.doc(user.uid).valueChanges()
         } else {
           return Observable.of(null)
         }
       })

       console.log(this.router.url);

    }

    get isAdmin() {
      return true;
    }

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.oAuthLogin(provider);
    }

    facebookLogin(): Promise<void> {
      const provider = new firebase.auth.FacebookAuthProvider()
      return this.oAuthLogin(provider);
    }

    oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user, provider)
      })
      .catch(err => {
        console.log('login error: ' + err);
      })
    }

    updateUserData(userAuthCreds, provider) {
      const data: User = {
        authID: userAuthCreds.uid,
        authMethod: provider.providerId,
        authDisplayName: userAuthCreds.displayName,
        authPhotoUrl: userAuthCreds.photoURL,
        key: userAuthCreds.uid,
        name: userAuthCreds.displayName,
        email: userAuthCreds.email,
        password: '',
        roles: ['student'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userAuthCreds.uid}`);
      userRef.snapshotChanges().map(action => action.payload.exists)
        .subscribe(exists => exists 
          ? console.log('user exists')//userRef.update(data)
          : userRef.set(data))
    }

    logout() {
      this.afAuth.auth.signOut().then(() => {
          this.router.navigate(['/']);
      });
    }

}
