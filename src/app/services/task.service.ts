import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Task } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class TaskService {
  tasks: AngularFirestoreCollection<Task>;
  
  constructor(private afs: AngularFirestore) { 
    this.tasks = this.afs.collection('tasks');
  }

  createNew(): Task {
    let data: Task = {
      key: '',
      name: '',
      descriptionHtml: '',
      notes: new Array,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }


  save(t: Task): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.tasks.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Task): Promise<void> {
    return this.tasks.doc(item.key).update(item);
  }
  
  delete(item: Task): Promise<void> {
    return this.tasks.doc(item.key).delete();
  }

}
