import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { AdminAdvertComponent } from './admin-advert/admin-advert.component';
import { AdminFormAnnouncementsComponent } from './admin-announcements/admin-announcements.component';
import { AdminFormFaqComponent } from './admin-faq/admin-faq.component';
import { AdminFormGalleryComponent } from './admin-gallery/admin-gallery.component';
import { AdminFormHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminFormResourceComponent } from './admin-resource/admin-resource.component';
import { AdminFormTeacherComponent } from './admin-teacher/admin-teacher.component';
import { AdminFormTestimonialComponent } from './admin-testimonial/admin-testimonial.component';
import { AdminFormUserComponent } from './admin-user/admin-user.component';
import { AdminFormVideoComponent } from './admin-video/admin-video.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AdminAdvertComponent,
    AdminFormAnnouncementsComponent,
    AdminFormFaqComponent,
    AdminFormGalleryComponent,
    AdminFormHomepageComponent,
    AdminFormResourceComponent,
    AdminFormTeacherComponent,
    AdminFormTestimonialComponent,
    AdminFormUserComponent,
    AdminFormVideoComponent,
  ],
  exports: [
    AdminAdvertComponent,
    AdminFormAnnouncementsComponent,
    AdminFormFaqComponent,
    AdminFormGalleryComponent,
    AdminFormHomepageComponent,
    AdminFormResourceComponent,
    AdminFormTeacherComponent,
    AdminFormTestimonialComponent,
    AdminFormUserComponent,
    AdminFormVideoComponent,
  ]
})
export class AdminModule { }
