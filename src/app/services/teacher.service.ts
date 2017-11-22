import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Teacher } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class TeacherService {
  teachers: AngularFirestoreCollection<Teacher>;
  
  constructor(private afs: AngularFirestore) { 
    this.teachers = this.afs.collection('teachers');
  }

  createNew(): Teacher {
    let data: Teacher = {
      key: '',
      name: '',
      summary: '',
      qualifications: '',
      instrument: '',
      imgUrl: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: Teacher): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.teachers.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Teacher): Promise<void> {
    return this.teachers.doc(item.key).update(item);
  }

  updateURL(item: Teacher, url: string): Promise<void> {
    //  this.afs.doc('teachers/' + item.key).update({imgUrl: url});
    return this.teachers.ref.doc(item.key).update({imgUrl: url});
  }

  delete(item: Teacher): Promise<void> {
    return this.teachers.doc(item.key).delete();
  }

}
