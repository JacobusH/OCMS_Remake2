import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiveChat, LiveChatMessage } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class LiveChatService {
  liveChats: AngularFirestoreCollection<{}>;
  liveChatsByDateNonArchived: AngularFirestoreCollection<{}>;
  
  constructor(private afs: AngularFirestore) { 
    this.liveChats = this.afs.collection('liveChats');
    this.liveChatsByDateNonArchived = this.afs.collection('liveChats', ref => 
      ref.orderBy("createdDate", "desc")
      .where("archived", "==", "false"));
  }

  createNewLiveChat(): LiveChat {
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

  createNewLiveChatMessage(): LiveChatMessage {
    let data: LiveChatMessage = {
      key: '',
      message: '',
      isActive: true,
      fromAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }


  getLiveChatMessagesByKey(key: string) {
    return this.afs.collection('liveChats/' + key + '/messages')
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
