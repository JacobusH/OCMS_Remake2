import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { JoinUs, Upload } from 'app/models/_index';

import * as firebase from 'firebase/app';

@Injectable()
export class JoinUsService {
  joins: AngularFirestoreCollection<JoinUs>;
  storage = firebase.storage();
  storageRef = this.storage.ref();
  
  constructor(private afs: AngularFirestore) { 
    this.joins = this.afs.collection('joins', ref => ref.orderBy("createdAt", "desc"));
  }

  createNew(): JoinUs {
    let data: JoinUs = {
      key: '',
      name: '',
      email: '',
      phone: '',
      message: '',
      createdAt: new Date(),
      downloadUrl: ''
    };
      return data;
  }

  getNumMsgs(howMany: number) {
    return this.afs.collection('contactMessages', ref => 
      ref
      .orderBy("createdAt", "desc")
      .limit(howMany)
    );
  }

  getMsgsRange(start: Date, end: Date) {
    return this.afs.collection('contactMessages', ref => 
      ref
        .where('createdAt', '>=', start)
        .where('createdAt', '<=', end)
      );
  }

  save(t: JoinUs, up: Upload): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.joins.add(t);
    promise.then(x => {
      x.update({key: x.id});

      let itemRef = this.storageRef.child('join-us/' + up.name);
      itemRef.getDownloadURL().then((url) => {
        // this.selectedPicture = url;
        this.joins.doc(x.id).update({imgUrl: url});
      })
      .catch((err) => {
        console.log(err);
      });
    });

    return promise;
  }

  edit(item: JoinUs): Promise<void> {
    return this.joins.doc(item.key).update(item);
  }

  updateURL(item: JoinUs, url: string): Promise<void> {
    return this.joins.ref.doc(item.key).update({imgUrl: url});
  }

  delete(item: JoinUs): Promise<void> {
    return this.joins.doc(item.key).delete();
  }

}
