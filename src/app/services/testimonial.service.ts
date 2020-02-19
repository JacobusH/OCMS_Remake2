import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial } from 'app/models/_index';

import * as firebase from 'firebase/app';

@Injectable()
export class TestimonialService {
  testimonials: AngularFirestoreCollection<Testimonial>;
  testimonialsActive: AngularFirestoreCollection<Testimonial>;
  testimonialsFirst4: AngularFirestoreCollection<Testimonial>;
  
  constructor(private afs: AngularFirestore) { 
    this.testimonials = this.afs.collection<Testimonial>('testimonials');
    this.testimonialsActive = this.afs.collection<Testimonial>('testimonials', ref => ref.where('isActive', '==', true));
    this.testimonialsFirst4 = this.afs.collection<Testimonial>('testimonials', ref => ref.limit(4));
  }

  createNew(): Testimonial {
    let data: Testimonial = {
      key: '',
      author: '',
      text: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
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

  delete(item: Testimonial): Promise<void> {
    return this.testimonials.doc(item.key).delete();
  }

}
