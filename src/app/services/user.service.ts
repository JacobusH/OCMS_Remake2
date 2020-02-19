import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'app/models/_index';

import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  users: AngularFirestoreCollection<User>;
  
  constructor(private afs: AngularFirestore) { 
    this.users = this.afs.collection('users');
  }

  createNew(): User {
    let data: User = {
      authID: '',
      authMethod: '',
      authDisplayName: '' ,
      authPhotoUrl: '',
      key: '',
      name: '',
      email: '',
      phone: '',
      role_admin: false,
      roles: {'admin': false, 'student': false},
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  saveNewUser(t: User): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.users.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  getByAuthId(authId: string) {
    return this.afs.collection('users', ref => ref.where('authId', '==', authId)).valueChanges();
  }

  edit(item: User): Promise<void> {
    return this.users.doc(item.key).update(item);
  }

  updateURL(item: User, url: string): Promise<void> {
    //  this.afs.doc('teachers/' + item.key).update({imgUrl: url});
    return this.users.ref.doc(item.key).update({imgUrl: url});
  }

  delete(item: User): Promise<void> {
    return this.users.doc(item.key).delete();
  }

}
