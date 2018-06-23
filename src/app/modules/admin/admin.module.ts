import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule   
  , MatDialogModule, MatMenuModule 
  , MatFormFieldModule, MatSidenavModule
  , MatSelectModule, MatInputModule
  , MatIconModule, MatIconRegistry  
  , MatGridListModule, MatCardModule
  , MatExpansionModule, MatOptionModule
} from '@angular/material';

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
import { AdminContactMessagesComponent } from './contact-messages/contact-messages.component';
import { AdminSignUpsComponent } from './sign-ups/sign-ups.component';
import { AdminTodoComponent } from './todo/todo.component';
import { SelectorSingleComponent } from './selector-single/selector-single.component';

// Routing
import { routing } from './admin.routing';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatOptionModule,
    MatSidenavModule,
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
    AdminContactMessagesComponent,
    AdminSignUpsComponent,
    AdminTodoComponent,
    SelectorSingleComponent,
    AdminComponent,
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
    AdminContactMessagesComponent,
    AdminSignUpsComponent,
    AdminTodoComponent,
  ]
})
export class AdminModule { } 
