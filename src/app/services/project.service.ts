import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class ProjectService {
  faqs: AngularFirestoreCollection<Project>;
  
  constructor(private afs: AngularFirestore) { 
    this.faqs = this.afs.collection('projects');
  }

  createNew(): Project {
    let data: Project = {
      key: '',
      name: '',
      tasks: new Array,
      notes: new Array,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: Project): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.faqs.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Project): Promise<void> {
    return this.faqs.doc(item.key).update(item);
  }
  
  delete(item: Project): Promise<void> {
    return this.faqs.doc(item.key).delete();
  }

}
