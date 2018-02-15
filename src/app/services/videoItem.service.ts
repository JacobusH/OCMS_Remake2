import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VideoItem } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class VideoItemService {
  videoItems: AngularFirestoreCollection<VideoItem>;
  videoItemsActive: AngularFirestoreCollection<VideoItem>;

  constructor(private afs: AngularFirestore) { 
    this.videoItems = this.afs.collection('videos');
    this.videoItemsActive = this.afs.collection('videos', ref => ref.where('isActive', '==', true));
  }

  createNew(): VideoItem {
    let data: VideoItem = {
      key: '',
      videoId: '',
      title: '',
      caption: '',
      categories: new Array,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: VideoItem): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.videoItems.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: VideoItem): Promise<void> {
    return this.videoItems.doc(item.key).update(item);
  }

  updateURL(item: VideoItem, url: string): Promise<void> {
    return this.videoItems.ref.doc(item.key).update({imgUrl: url});
  }

  delete(item: VideoItem): Promise<void> {
    return this.videoItems.doc(item.key).delete();
  }

}
