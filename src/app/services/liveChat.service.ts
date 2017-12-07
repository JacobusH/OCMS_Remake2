import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiveChat, LiveChatMessage } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class LiveChatService {
  private switchKey = 'dlpByXHMG3HEKvuh6r5c';
  liveChats: AngularFirestoreCollection<{}>;
  liveChatsByDate: AngularFirestoreCollection<{}>;
  switchy: AngularFirestoreDocument<{'isActive': boolean}>;
  
  constructor(private afs: AngularFirestore) { 
    this.liveChats = this.afs.collection('liveChats');
    this.liveChatsByDate = this.afs.collection('liveChats', ref => 
      ref.orderBy("createdAt", "desc")
      .where("isActive", "==", true));

    this.switchy = this.afs.doc('liveChatSwitch/' + this.switchKey);
  }

  createNewLiveChat(): LiveChat {
    let data: LiveChat = {
      key: '',
      name: '',
      email: '',
      isActive: true,
      hasUnreadMessages: true,
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


  getLiveChatByKey(key: string) {
    return this.afs.doc('liveChats/' + key);
  }

  getMessagesByKey(key: string) {
    // return this.afs.collection('liveChats/' + key + '/messages', ref => 
    //   ref.orderBy("createdAt", "desc")
    // );

    return this.afs.collection('liveChats/' + key + 'messages');
  }

  addLiveChatMessage(chatKey: string, msg: string, fromAdmin: boolean) {
    let chatMsg = this.createNewLiveChatMessage();
    chatMsg.message = msg;
    chatMsg.fromAdmin = fromAdmin;

    this.afs.collection("liveChats/" + chatKey + "/messages").add(chatMsg);
  }

  markLiveChatUnreadMessage(key: string, hasNewUnread: boolean) {
    this.afs.doc("liveChats/" + key).update({hasUnreadMessage: hasNewUnread});
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

  flipLiveChatSwitch(currentState: boolean) {
    let newState = !currentState;
    this.afs.doc('liveChatSwitch/' + this.switchKey).update({'isActive': newState});
  }

}
