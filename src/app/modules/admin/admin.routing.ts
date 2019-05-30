import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// components
import { AdminAdvertComponent } from './admin-advert/admin-advert.component';
import { AdminContactMessagesComponent } from './contact-messages/contact-messages.component';
import { AdminFormAnnouncementsComponent } from './admin-announcements/admin-announcements.component';
import { AdminFormFaqComponent } from './admin-faq/admin-faq.component';
import { AdminFormGalleryComponent } from './admin-gallery/admin-gallery.component';
import { AdminFormHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminFormResourceComponent } from './admin-resource/admin-resource.component';
import { AdminFormTeacherComponent } from './admin-teacher/admin-teacher.component';
import { AdminFormTestimonialComponent } from './admin-testimonial/admin-testimonial.component';
import { AdminFormUserComponent } from './admin-user/admin-user.component';
import { AdminFormVideoComponent } from './admin-video/admin-video.component';
import { AdminSignUpsComponent } from './sign-ups/sign-ups.component';
import { AdminTodoComponent } from './todo/todo.component';
import { AdminComponent } from './admin.component';

import { LiveChatManagerComponent } from '../live-chat/manager/manager.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent,
  children: [
    { path: '', redirectTo: 'signups', pathMatch: 'full' },
    { path: 'adverts', component: AdminAdvertComponent},
    { path: "announcements", component: AdminFormAnnouncementsComponent},
    { path: "messages", component: AdminContactMessagesComponent},
    { path: "chat", component: LiveChatManagerComponent },
    { path: "faq", component: AdminFormFaqComponent},
    { path: "media", component: AdminFormGalleryComponent},
    { path: "resources", component: AdminFormResourceComponent},
    { path: "signups", component: AdminSignUpsComponent},
    { path: "testimonials", component: AdminFormTestimonialComponent},
    { path: "teachers", component: AdminFormTeacherComponent},
    { path: "todo", component: AdminTodoComponent},
    { path: "users", component: AdminFormUserComponent},
    { path: "videos", component: AdminFormVideoComponent},
  ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);