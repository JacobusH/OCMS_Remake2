import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GalleryItem, Upload } from 'app/models/_index';
import 'rxjs/add/operator/switchMap' 
import * as firebase from 'firebase/app';

@Injectable()
export class GalleryService {
  gallery: AngularFirestoreCollection<GalleryItem>;
  galleryActive: AngularFirestoreCollection<GalleryItem>;
  storage = firebase.storage();
  storageRef = this.storage.ref();
  
  constructor(private afs: AngularFirestore) { 
    this.gallery = this.afs.collection('gallery');
    this.galleryActive = this.afs.collection('gallery', ref => ref.where('isActive', '==', true));
    
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

  save(t: GalleryItem, up: Upload): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.gallery.add(t);
    promise.then(x => {
      x.update({key: x.id});

      let itemRef = this.storageRef.child('gallery/' + up.name);
      itemRef.getDownloadURL().then((url) => {
        // this.selectedPicture = url;
        this.gallery.doc(x.id).update({imgUrl: url});
      })
      .catch((err) => {
        console.log(err);
      });
    });

    return promise;
  }

  edit(item: GalleryItem): Promise<void> {
    return this.gallery.doc(item.key).update(item);
  }

  updateURL(item: GalleryItem, url: string): Promise<void> {
    //  this.afs.doc('teachers/' + item.key).update({imgUrl: url});
    return this.gallery.ref.doc(item.key).update({imgUrl: url});
  }

  delete(item: GalleryItem): Promise<void> {
    return this.gallery.doc(item.key).delete();
  }

}
