import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class NoteService {
  notes: AngularFirestoreCollection<Note>;
  
  constructor(private afs: AngularFirestore) { 
    this.notes = this.afs.collection('notes');
  }

  createNew(): Note {
    let data: Note = {
      key: '',
      name: '',
      freeText: '',
      listItems: new Array,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: Note): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.notes.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Note): Promise<void> {
    return this.notes.doc(item.key).update(item);
  }
  
  delete(item: Note): Promise<void> {
    return this.notes.doc(item.key).delete();
  }

}
