
// Modules
import { AccordionModule } from 'ngx-accordion';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ButtonModule, DialogModule, OrderListModule, MenuModule, MenuItem } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

// Guards
import { AuthGuard } from 'app/guards/auth.guard';

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
import { GalleryComponent } from './pages/gallery/gallery.component';

// Services
import { AuthService, AlertMultiService, AlertService, ContactMessageService, FAQService, GalleryService
  , LiveChatService, ResourceService, SignupService, TestimonialService
  , TeacherService, UserService } from 'app/services/_index';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ThanksComponent } from './pages/contact/thanks/thanks.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ImageGalleryComponent } from './components/image/image-gallery/image-gallery.component';

// pipes
import { ImageFilterPipe } from 'app/filters/image-filter.pipe';
import { LearntoplayComponent } from './pages/learntoplay/learntoplay.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { ManagerComponent } from './components/live-chat/manager/manager.component';
import { WindowComponent } from './components/live-chat/window/window.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { CalendarHeaderComponent } from './components/calendar/calendar-header/calendar-header.component';
import { TodoerComponent } from './components/todoer/todoer.component';
import { CalendoerComponent } from './components/calendoer/calendoer.component';
import { DateTimePickerComponent } from './components/calendar/date-time-picker/date-time-picker.component';
import { CalendarNoteDayViewComponent } from './components/calendar/calendar-note-day-view/calendar-note-day-view.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministrationComponent } from './pages/administration/administration.component';

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
  { path: 'admin', canActivate: [AuthGuard], component: AdministrationComponent, children: [
    // { path: "messages", component: MessageManagerComponent},
    // { path: "chat", component: LivechatManagerComponent},
    // { path: "media", component: MediaManagerComponent},
    // { path: "signups", component: SignupManagerComponent},
    // { path: "users", component: UserManagerComponent},
  ] },
  { path: 'about', component: AboutComponent },
  // { path: 'announcements', component: AnnouncementsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'gallery', component: GalleryComponent },
  // { path: 'gallery/image/:id', component: ImageGalleryDetailComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'home/:id', component: HomeComponent },
  { path: 'learntoplay', component: LearntoplayComponent },
  { path: 'learntoplay/:id', component: LearntoplayComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'login', component: LoginComponent },
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
  { path: '**', component: PageNotFoundComponent }

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
    HeaderComponent,
    ContactComponent,
    ThanksComponent,
    FaqComponent,
    ImageGalleryComponent,
    GalleryComponent,
    ImageFilterPipe,
    LearntoplayComponent,
    PageNotFoundComponent,
    LiveChatComponent,
    ManagerComponent,
    WindowComponent,
    PlaygroundComponent,
    CalendarHeaderComponent,
    TodoerComponent,
    CalendoerComponent,
    DateTimePickerComponent,
    CalendarNoteDayViewComponent,
    LoginComponent,
    AdministrationComponent
  ],
  imports: [
    AccordionModule, 
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule.forRoot(),
    ContextMenuModule,
    DialogModule,
    DragAndDropModule.forRoot(),
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MenuModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    OrderListModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    TreeModule  
  ],
  providers: [
    AuthGuard,
    AlertService,
    AlertMultiService,
    AuthService, 
    AngularFireAuth,
    ContactMessageService,
    FAQService,
    FormsModule,
    GalleryService,
    LiveChatService,
    ResourceService,
    SignupService,
    TestimonialService,
    TeacherService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
