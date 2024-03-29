import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { ContactMessage } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class ContactMessageService {
  contactMessages: AngularFirestoreCollection<ContactMessage>;
  
  constructor(private afs: AngularFirestore) { 
    this.contactMessages = this.afs.collection('contactMessages', ref => ref.orderBy("createdAt", "desc"));
  }

  createNew(): ContactMessage {
    let data: ContactMessage = {
      key: '',
      name: '',
      email: '',
      phone: '',
      message: '',
      isActive: true,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
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

  save(t: ContactMessage): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.contactMessages.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: ContactMessage): Promise<void> {
    return this.contactMessages.doc(item.key).update(item);
  }

  updateURL(item: ContactMessage, url: string): Promise<void> {
    //  this.afs.doc('teachers/' + item.key).update({imgUrl: url});
    return this.contactMessages.ref.doc(item.key).update({imgUrl: url});
  }

  delete(item: ContactMessage): Promise<void> {
    return this.contactMessages.doc(item.key).delete();
  }

}
