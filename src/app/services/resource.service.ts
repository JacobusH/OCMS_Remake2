import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resource } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class ResourceService {
  resources: AngularFirestoreCollection<Resource>;
  
  constructor(private afs: AngularFirestore) { 
    this.resources = this.afs.collection('resources');
  }

  createNew(): Resource {
    let data: Resource = {
      key: '',
      title: '',
      category: '',
      url: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: Resource): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.resources.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Resource): Promise<void> {
    return this.resources.doc(item.key).update(item);
  }

  delete(item: Resource): Promise<void> {
    return this.resources.doc(item.key).delete();
  }

}
