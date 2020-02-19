import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from 'app/models/_index';

import * as firebase from 'firebase/app';
import * as moment from 'moment';

@Injectable()
export class AnnouncementService {
  announcements: AngularFirestoreCollection<Announcement>;
  announcementsActive: AngularFirestoreCollection<Announcement>;
  announcementsLastDay: AngularFirestoreCollection<Announcement>;
  announcementsMostRecent1: AngularFirestoreCollection<Announcement>;
  announcementsMostRecent2: AngularFirestoreCollection<Announcement>;
  
  constructor(private afs: AngularFirestore) { 
    this.announcements = this.afs.collection('announcements');
    this.announcementsActive = this.afs.collection('announcements', ref => ref.where('isActive', '==', true));
    this.announcementsLastDay = this.afs.collection('announcements', ref => ref.where('createdAt', '>=', new Date(Date.now() - 8.64e7)));
    this.announcementsMostRecent1 = this.afs.collection('announcements', ref => ref.limit(1).orderBy('createdAt', 'desc') );
    this.announcementsMostRecent2 = this.afs.collection('announcements', ref => ref.limit(2).orderBy('createdAt', 'desc') );
  }

  createNew(): Announcement {
    let data: Announcement = {
      key: '',
      announcement: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: Announcement): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.announcements.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Announcement): Promise<void> {
    return this.announcements.doc(item.key).update(item);
  }
  
  delete(item: Announcement): Promise<void> {
    return this.announcements.doc(item.key).delete();
  }



}
