import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Testimonial } from 'app/models/_index';
import { TestimonialService } from 'app/services/_index';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-home-testimonials',
  templateUrl: './home-testimonials.component.html',
  styleUrls: ['./home-testimonials.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeTestimonialsComponent implements OnInit {
  // testimonials: AngularFirestoreCollection<Testimonial>;
  testimonials: Observable<Testimonial[]>;
  
  constructor(private afs: AngularFirestore, private testServ: TestimonialService) { 
    this.testimonials = this.testServ.testimonialsFirst4.valueChanges();
  }

  ngOnInit() {
  }

}
