import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiveChat } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class LiveChatService {
  liveChats: AngularFirestoreCollection<LiveChat>;
  liveChatsByDateNonArchived: AngularFirestoreCollection<LiveChat>;
  
  constructor(private afs: AngularFirestore) { 
    this.liveChats = this.afs.collection('liveChats');
    this.afs.collection('liveChats', ref => 
      ref.orderBy("createdDate", "desc")
      .where("archived", "==", "false")
    )
  }

  createNew(): LiveChat {
    let data: LiveChat = {
      key: '',
      name: '',
      email: '',
      messages: new Array,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: LiveChat): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.liveChats.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: LiveChat): Promise<void> {
    return this.liveChats.doc(item.key).update(item);
  }

  delete(item: LiveChat): Promise<void> {
    return this.liveChats.doc(item.key).delete();
  }

}
