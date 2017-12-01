import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Teacher, Upload } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class TeacherService {
  teachers: AngularFirestoreCollection<Teacher>;
  teachersActive: AngularFirestoreCollection<Teacher>;
  storage = firebase.storage();
  storageRef = this.storage.ref();


  constructor(private afs: AngularFirestore) { 
    this.teachers = this.afs.collection('teachers');
    this.teachersActive = this.afs.collection('teachers', ref => ref.where('isActive', '==', true));
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

  save(t: Teacher, up: Upload): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.teachers.add(t);
    promise.then(x => {
      x.update({key: x.id});

      let teacherRef = this.storageRef.child('teacher/' + up.name);
      teacherRef.getDownloadURL().then((url) => {
        // this.selectedPicture = url;
        this.teachers.doc(x.id).update({imgUrl: url});
      })
      .catch((err) => {
        console.log(err);
      });
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
