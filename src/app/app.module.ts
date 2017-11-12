
// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeLearntoplayComponent } from './pages/home/home-learntoplay/home-learntoplay.component';
import { HomeSplashComponent } from './pages/home/home-splash/home-splash.component';
import { HomeTeachersComponent } from './pages/home/home-teachers/home-teachers.component';
import { HomeTestimonialsComponent } from './pages/home/home-testimonials/home-testimonials.component';
import { HomeTilesComponent } from './pages/home/home-tiles/home-tiles.component';
import { AboutComponent } from './pages/about/about.component';

// Services
import { TestimonialService, TeacherService } from 'app/services/_index';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCFToauOWTjn55Oc2e6L1YkCt5ZGzbMXV8",
  authDomain: "ocmusicschool-11817.firebaseapp.com",
  databaseURL: "https://ocmusicschool-11817.firebaseio.com",
  projectId: "ocmusicschool-11817",
  storageBucket: "ocmusicschool-11817.appspot.com",
  messagingSenderId: "202663817255"
};


const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'admin', canActivate: [AuthGuard], component: AdministrationComponent, children: [
  //   { path: "messages", component: MessageManagerComponent},
  //   { path: "chat", component: LivechatManagerComponent},
  //   { path: "media", component: MediaManagerComponent},
  //   { path: "signups", component: SignupManagerComponent},
  //   { path: "users", component: UserManagerComponent},
  // ] },
  { path: 'about', component: AboutComponent },
  // { path: 'announcements', component: AnnouncementsComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'faq', component: FAQComponent },
  // { path: 'gallery', component: GalleryComponent },
  // { path: 'gallery/image/:id', component: ImageGalleryDetailComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'home/:id', component: HomeComponent },
  // { path: 'learntoplay', component: LearntoplayComponent },
  // { path: 'learntoplay/:id', component: LearntoplayComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'resources', component: ResourcesComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'teachers', component: TeachersComponent },
  // { path: 'teachers/:id', component: TeacherDetailComponent,
  //   // children: [
  //   //   { path: '', redirectTo: 'overview', pathMatch: 'full' },
  //     // { path: 'overview', component: Overview },
  //     // { path: 'specs', component: Specs }
  //   // ]
  // },
  // { path: 'testimonials', component: TestimonialsComponent },
  // { path: 'testing/youtube', component: YoutubeComponent },
  // { path: 'testing/upload', component: UploadComponent },
  // { path: 'testing/tree', component: TreeComponent },
  // { path: 'contact/thanks', component: ThanksComponent },
  // { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HomeComponent,
    HomeLearntoplayComponent,
    HomeSplashComponent,
    HomeTeachersComponent,
    HomeTestimonialsComponent,
    HomeTilesComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(routes)     
  ],
  providers: [
    TestimonialService, 
    TeacherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
