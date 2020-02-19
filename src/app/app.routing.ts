import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Guards
import { AdminGuard } from 'app/guards/admin.guard';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { BootcampComponent } from './pages/bootcamp/bootcamp.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ThanksComponent } from './pages/contact/thanks/thanks.component';
import { JoinThanksComponent } from './pages/join-us/thanks/thanks.component';
import { FaqComponent } from './pages/faq/faq.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { JoinUsComponent } from './pages/join-us/join-us.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { HomeComponent } from './pages/home/home.component';
import { LearntoplayComponent } from './pages/learntoplay/learntoplay.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { TeacherDetailComponent } from './pages/teachers/detail/detail.component';
import { VideosComponent } from './pages/videos/videos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'about', component: AboutComponent },
  { path: 'bootcamp', component: BootcampComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'home', component: HomeComponent },
  { path: 'join-us', component: JoinUsComponent },
  { path: 'join-us/thanks', component: JoinThanksComponent },
  { path: 'learntoplay', component: LearntoplayComponent },
  { path: 'learntoplay/:id', component: LearntoplayComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'teachers/:id', component: TeacherDetailComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'contact', component: ContactComponent}, 
  { path: 'contact/thanks', component: ThanksComponent}, 
  { path: 'contact/:id', component: ContactComponent }, 
  { path: 'admin', canActivate: [AdminGuard], loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: '**', component: PageNotFoundComponent }
  ];
  
  export const routing: ModuleWithProviders = RouterModule.forRoot(routes);