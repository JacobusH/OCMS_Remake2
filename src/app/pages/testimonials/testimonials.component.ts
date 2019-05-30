import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Testimonial } from 'app/models/_index';
import { TestimonialService } from 'app/services/_index';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TestimonialsComponent implements OnInit {
  testimonials;

  constructor(private testimonialService: TestimonialService) { 
    this.testimonials = this.testimonialService.testimonials.valueChanges();
  }

  ngOnInit() {
  }

}
