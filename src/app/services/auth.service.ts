import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UserService,
    private router: Router) { 
       //// Get auth data, then get firestore user document || null
       this.user = this.afAuth.authState
       .switchMap(user => {
         if (user) {
          //  return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
           return this.userService.users.doc(user.uid).valueChanges()
         } else {
           return Observable.of(null)
         }
       })
    }

    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()
      return this.oAuthLogin(provider);
    }

    oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {

          const doc = this.userService.users.doc(credential.user.id).snapshotChanges(). take(1).toPromise()
          doc.then(snap => {
            snap.payload.exists ? this.updateUserData(credential.user) : this.setUserData(credential.user)
          })

          
        })
    }

    updateUserData(userAuthCreds) {
      // Sets user data to firestore on login
      let user: User = new User(userAuthCreds.uid, '', userAuthCreds.displayName, userAuthCreds.displayName, userAuthCreds.photoURL, userAuthCreds.em, '',  );
      // this.userService.save()

      // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      // const data: User = {
      //   uid: user.uid,
      //   email: user.email,
      //   displayName: user.displayName,
      //   photoURL: user.photoURL
      // }
      // return userRef.set(data)
    }

    setUserData(userAuthCreds) {
      // Sets user data to firestore on login
      let user: User = new User(userAuthCreds.uid
        , ''
        , userAuthCreds.displayName
        , userAuthCreds.displayName
        , userAuthCreds.photoURL
        , userAuthCreds.email
        , ''
        , 'student'
        , userAuthCreds.auth.provider);
      this.userService.saveNewUser(user);
    }

    checkUserExists() {
     
    }

    signOut() {
      this.afAuth.auth.signOut().then(() => {
          this.router.navigate(['/']);
      });
    }

}
