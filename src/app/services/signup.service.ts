import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Signup } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class SignupService {
  signups: AngularFirestoreCollection<Signup>;
  signupsRecentFirst: AngularFirestoreCollection<Signup>;
  
  constructor(private afs: AngularFirestore) { 
    this.signups = this.afs.collection('signups');
    this.signupsRecentFirst = this.afs.collection('signups', ref => ref.orderBy('createdAt', 'desc'));
  }

  createNew(): Signup {
    let data: Signup = {
      key: '',
      name: '',
      email: '',
      phone: '',
      instrument: '',
      about: '',
      read: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  getNumSignups(howMany: number) {
    return this.afs.collection('signups', ref => 
      ref
        .orderBy('createdAt', 'desc')
        .limit(howMany)
    );
  }

  getSignupsRange(start: Date, end: Date) {
    return this.afs.collection('signups', ref => 
      ref
        .where('createdAt', '>=', start)
        .where('createdAt', '<=', end));
  }

  save(t: Signup): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.signups.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Signup): Promise<void> {
    return this.signups.doc(item.key).update(item);
  }

  delete(item: Signup): Promise<void> {
    return this.signups.doc(item.key).delete();
  }

}
