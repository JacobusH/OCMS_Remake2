import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Testimonial } from 'app/models/_index';
import { TestimonialService } from 'app/services/_index';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-form-testimonial',
  templateUrl: './admin-testimonial.component.html',
  styleUrls: ['./admin-testimonial.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminFormTestimonialComponent implements OnInit {
  private model = this.testimonialService.createNew();
  selectedTestimonial: Testimonial;
  private testimonials: Observable<{}[]>;

  constructor(private testimonialService: TestimonialService) { 
    this.testimonials = this.testimonialService.testimonials.valueChanges();
  }

  ngOnInit() {
  }

  saveTestimonial(form: NgForm) {
    // uploading new teacher with picture
    if(this.selectedTestimonial == null) {
      this.testimonialService.save(this.model)
      this.model = this.testimonialService.createNew();
      form.reset();
    }
    // editing testimonial
    else {
      this.testimonialService.edit(this.selectedTestimonial)
      form.reset();
    }
  }

  setNewTestimonial() {
    this.selectedTestimonial = null;
    this.model = this.testimonialService.createNew();
  }

  setSelectedTestimonial(test: Testimonial) {
    this.selectedTestimonial = test;
    this.model = test;
  }

  deleteTestimonial(form: NgForm) {
    form.reset();
    this.testimonialService.delete(this.selectedTestimonial);
  }


}
