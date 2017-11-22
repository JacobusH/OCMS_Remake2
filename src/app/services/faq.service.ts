import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FAQ } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class FAQService {
  faqs: AngularFirestoreCollection<FAQ>;
  
  constructor(private afs: AngularFirestore) { 
    this.faqs = this.afs.collection('faqs');
  }

  createNew(): FAQ {
    let data: FAQ = {
      key: '',
      question: '',
      answer: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: FAQ): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.faqs.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: FAQ): Promise<void> {
    return this.faqs.doc(item.key).update(item);
  }
  
  delete(item: FAQ): Promise<void> {
    return this.faqs.doc(item.key).delete();
  }

}
