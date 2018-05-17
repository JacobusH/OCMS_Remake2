import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
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
  isAdmin = false;

  constructor(public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UserService,
    private router: Router) { 
      // this.authstate = this.afAuth.authState; // set this if afAuth is not public
      this.user = this.afAuth.authState.switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null)
        }
      })
    }

    emailLogin(username, pass) {
      const provider = new firebase.auth.EmailAuthProvider()
      this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(username, pass).then(x => {
        // worked, afAuth.authState will change now
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log("EMAIL LOGIN ERROR");
        console.log(err);
      })
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
        phone: userAuthCreds.phone,
        email: userAuthCreds.email,
        role_admin: false,
        roles: {'admin': false, 'student': false},
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
