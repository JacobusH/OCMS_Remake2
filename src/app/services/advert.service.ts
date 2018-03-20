import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Advert, Upload } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';


@Injectable()
export class AdvertService {
  adverts: AngularFirestoreCollection<Advert>;
  advertsActive: AngularFirestoreCollection<Advert>;
  storage = firebase.storage();
  storageRef = this.storage.ref();
  
  constructor(private afs: AngularFirestore) { 
    this.adverts = this.afs.collection('adverts');
    this.advertsActive = this.afs.collection('adverts', ref => ref.where('isActive', '==', true));
  }

  createNew(): Advert {
    let data: Advert = {
      key: '',
      name: '',
      imgUrl: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  save(t: Advert, up: Upload): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.adverts.add(t);
    promise.then(x => {
      x.update({key: x.id});

      let itemRef = this.storageRef.child('adverts/' + up.name);
      itemRef.getDownloadURL().then((url) => {
        // this.selectedPicture = url;
        this.advertsActive.doc(x.id).update({imgUrl: url});
      })
      .catch((err) => {
        console.log(err);
      });
    });

    return promise;
  }

  edit(item: Advert): Promise<void> {
    return this.adverts.doc(item.key).update(item);
  }

  delete(item: Advert): Promise<void> {
    return this.adverts.doc(item.key).delete();
  }

}
