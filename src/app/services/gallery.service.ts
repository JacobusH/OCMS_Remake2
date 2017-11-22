import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GalleryItem } from 'app/models/_index';
import 'rxjs/add/operator/switchMap' 
import * as firebase from 'firebase/app';

@Injectable()
export class GalleryService {
  gallery: AngularFirestoreCollection<GalleryItem>;
  
  constructor(private afs: AngularFirestore) { 
    this.gallery = this.afs.collection('gallery');
  }

  createNew(): GalleryItem {
    let data: GalleryItem = {
      key: '',
      caption: '',
      categories: new Array,
      imgUrl: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: GalleryItem): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.gallery.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: GalleryItem): Promise<void> {
    return this.gallery.doc(item.key).update(item);
  }

  delete(item: GalleryItem): Promise<void> {
    return this.gallery.doc(item.key).delete();
  }

}
