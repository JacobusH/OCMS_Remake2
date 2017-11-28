
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
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatMenuModule, MatFormFieldModule, MatSidenavModule } from '@angular/material';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

// Guards
import { AuthGuard } from 'app/guards/auth.guard';
import { AdminGuard } from 'app/guards/admin.guard';

// Components
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeLearntoplayComponent } from './pages/home/home-learntoplay/home-learntoplay.component';
import { HomeSplashComponent } from './pages/home/home-splash/home-splash.component';
import { HomeTeachersComponent } from './pages/home/home-teachers/home-teachers.component';
import { HomeTestimonialsComponent } from './pages/home/home-testimonials/home-testimonials.component';
import { HomeTilesComponent } from './pages/home/home-tiles/home-tiles.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { LearntoplayComponent } from './pages/learntoplay/learntoplay.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { ManagerComponent } from './components/live-chat/manager/manager.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoerComponent } from './components/todoer/todoer.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ThanksComponent } from './pages/contact/thanks/thanks.component';
import { WindowComponent } from './components/live-chat/window/window.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ImageGalleryComponent } from './components/image/image-gallery/image-gallery.component';
// CALENDOER
import { CalendarHeaderComponent } from './components/calendar/calendar-header/calendar-header.component';
import { CalendoerComponent } from './components/calendoer/calendoer.component';
import { CalendarNoteDayViewComponent } from './components/calendar/calendar-note-day-view/calendar-note-day-view.component';
import { CalendoerEventModalComponent } from './components/modals/calendoer-event-modal/calendoer-event-modal.component';
import { DateTimePickerComponent } from './components/calendar/date-time-picker/date-time-picker.component';
// FORMS
import { AdminFaqComponent } from './components/forms/admin-faq/admin-faq.component';
import { AdminGalleryComponent } from './components/forms/admin-gallery/admin-gallery.component';
import { AdminTeacherComponent } from './components/forms/admin-teacher/admin-teacher.component';
import { AdminUserComponent } from './components/forms/admin-user/admin-user.component';
// ADMIN
import { AdministrationComponent } from './pages/administration/administration.component';
import { AdminHomepageComponent } from './components/forms/admin-homepage/admin-homepage.component';
import { HomepageComponent } from './pages/administration/homepage/homepage.component';
import { SignUpsComponent } from './pages/administration/sign-ups/sign-ups.component';
import { TeachersComponent } from './pages/administration/teachers/teachers.component';
import { UsersComponent } from './pages/administration/users/users.component';

// Services
import { AuthService, AlertMultiService, AlertService, ContactMessageService, FAQService, GalleryService
  , LiveChatService, ProjectService, ResourceService, SignupService, TestimonialService
  , TeacherService, UserService, UploadService } from 'app/services/_index';

// pipes
import { ImageFilterPipe } from 'app/filters/image-filter.pipe';
import { ContactMessagesComponent } from './pages/administration/contact-messages/contact-messages.component';
import { MediaComponent } from './pages/administration/media/media.component';

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
  { path: 'admin', canActivate: [AdminGuard], component: AdministrationComponent, children: [
    { path: "messages", component: ContactMessagesComponent},
    { path: "chat", component: LiveChatComponent},
    { path: "media", component: MediaComponent},
    { path: "signups", component: SignUpsComponent},
    { path: "teachers", component: TeachersComponent},
    { path: "users", component: UsersComponent},
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
  entryComponents: [
    CalendoerEventModalComponent
  ],
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
    AdministrationComponent,
    CalendoerEventModalComponent,
    AdminUserComponent,
    AdminGalleryComponent,
    AdminTeacherComponent,
    AdminFaqComponent,
    AdminHomepageComponent,
    SignUpsComponent,
    HomepageComponent,
    UsersComponent,
    TeachersComponent,
    ContactMessagesComponent,
    MediaComponent
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
    MatFormFieldModule,
    MatMenuModule,
    MatSidenavModule,
    MenuModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    OrderListModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    TreeModule  
  ],
  providers: [
    AdminGuard,
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
    ProjectService,
    ResourceService,
    SignupService,
    TestimonialService,
    TeacherService,
    UserService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
