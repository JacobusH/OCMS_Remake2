import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FAQ } from 'app/models/_index';
import { FAQService } from 'app/services/_index';
import { NgxCarousel } from 'ngx-carousel';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FaqComponent implements OnInit {
  // testimonials: AngularFirestoreCollection<Testimonial>;
  faqs: Observable<FAQ[]>;
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
  
  constructor(private afs: AngularFirestore, private testServ: FAQService) { 
    this.faqs = this.testServ.faqs.valueChanges();
  }

  ngOnInit() {
    // this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.carouselTileItems = [
      '../../../assets/img/gallery/GalleryPhoto (1).jpg'
      , 1
      , 2
      , 3
      , 4
      , 5
      , 6
      , 7
      , 8
      , 9
      , 10
      , 11
      , 12
      , 13
    ];
 
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

  // carouselLoad will trigger this funnction when your load value reaches
  // it is helps to load the data by parts to increase the performance of the app
  // must use feature to all carousel
  public carouselTileLoad(evt: any) {
    // const len = this.carouselTileItems.length
    // if (len <= 30) {
    //   for (let i = len; i < len + 10; i++) {
    //     this.carouselTileItems.push(i);
    //   }
    // }
  }
 
     

}
