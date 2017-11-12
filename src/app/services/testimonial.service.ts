import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Testimonial } from 'app/models/_index';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class TestimonialService {
  testimonials: AngularFirestoreCollection<Testimonial>;
  
  constructor(private afs: AngularFirestore) { 
    this.testimonials = this.afs.collection('testimonials');
  }

  save(t: Testimonial): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.testimonials.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Testimonial): Promise<void> {
    return this.testimonials.doc(item.key).update(item);
  }

  updateURL(item: Testimonial, url: string): Promise<void> {
    //  this.afs.doc('teachers/' + item.key).update({imgUrl: url});
    return this.testimonials.ref.doc(item.key).update({imgUrl: url});
  }

  delete(item: Testimonial): Promise<void> {
    return this.testimonials.doc(item.key).delete();
  }

}
