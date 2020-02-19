import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todoer, TreeNode } from 'app/models/_index';

import * as firebase from 'firebase/app';

@Injectable()
export class TodoerService {
  todoers: AngularFirestoreCollection<Todoer>;
  
  constructor(private afs: AngularFirestore) { 
    this.todoers = this.afs.collection('notes');
  }

  save(t: Todoer): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.todoers.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Todoer): Promise<void> {
    return this.todoers.doc(item.key).update(item);
  }
  
  delete(item: Todoer): Promise<void> {
    return this.todoers.doc(item.key).delete();
  }

}
