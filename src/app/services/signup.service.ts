import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Signup } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class SignupService {
  testimonials: AngularFirestoreCollection<Signup>;
  
  constructor(private afs: AngularFirestore) { 
    this.testimonials = this.afs.collection('testimonials');
  }

  save(t: Signup): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.testimonials.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Signup): Promise<void> {
    return this.testimonials.doc(item.key).update(item);
  }

  delete(item: Signup): Promise<void> {
    return this.testimonials.doc(item.key).delete();
  }

}
