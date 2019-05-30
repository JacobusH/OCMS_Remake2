import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Calendoer } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class TodoerService {
  calendoers: AngularFirestoreCollection<Calendoer>;
  
  constructor(private afs: AngularFirestore) { 
    this.calendoers = this.afs.collection('notes');
  }

  save(t: Calendoer): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.calendoers.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Calendoer): Promise<void> {
    return this.calendoers.doc(item.key).update(item);
  }
  
  delete(item: Calendoer): Promise<void> {
    return this.calendoers.doc(item.key).delete();
  }

}
