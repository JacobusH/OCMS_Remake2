// Modules
// import { EmptyTextModule } from 'calendoer';
import { AccordionModule } from 'ngx-accordion';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ButtonModule, DialogModule, OrderListModule, MenuModule, MenuItem } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule
  , MatDialogModule, MatMenuModule
  , MatFormFieldModule, MatSidenavModule
  , MatSelectModule, MatInputModule
  , MatIconModule, MatIconRegistry 
  , MatGridListModule, MatCardModule
} from '@angular/material';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph'
import { NgxCarouselModule } from 'ngx-carousel';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import 'hammerjs';

// Guards
import { AuthGuard } from 'app/guards/auth.guard';
import { AdminGuard } from 'app/guards/admin.guard';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ThanksComponent } from './pages/contact/thanks/thanks.component';
import { FaqComponent } from './pages/faq/faq.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeLearntoplayComponent } from './pages/home/home-learntoplay/home-learntoplay.component';
import { HomeSplashComponent } from './pages/home/home-splash/home-splash.component';
import { HomeTeachersComponent } from './pages/home/home-teachers/home-teachers.component';
import { HomeTestimonialsComponent } from './pages/home/home-testimonials/home-testimonials.component';
import { HomeTilesComponent } from './pages/home/home-tiles/home-tiles.component';
import { LearntoplayComponent } from './pages/learntoplay/learntoplay.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { TeacherDetailComponent } from './pages/teachers/detail/detail.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

// Components
import { AppComponent } from './app.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { LiveChatManagerComponent } from './components/live-chat/manager/manager.component';
import { TodoerComponent } from './components/todoer/todoer.component';
import { WindowComponent } from './components/live-chat/window/window.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ImageGalleryComponent } from './components/image/image-gallery/image-gallery.component';
import { TileDisplayComponent } from './components/image/tile-display/tile-display.component';
// CALENDOER
import { CalendarHeaderComponent } from './components/calendar/calendar-header/calendar-header.component';
import { CalendoerComponent } from './components/calendoer/calendoer.component';
import { CalendarNoteDayViewComponent } from './components/calendar/calendar-note-day-view/calendar-note-day-view.component';
import { CalendoerEventModalComponent } from './components/modals/calendoer-event-modal/calendoer-event-modal.component';
import { DateTimePickerComponent } from './components/calendar/date-time-picker/date-time-picker.component';
// FORMS
import { AdminFormFaqComponent } from './components/forms/admin-faq/admin-faq.component';
import { AdminFormGalleryComponent } from './components/forms/admin-gallery/admin-gallery.component';
import { AdminFormHomepageComponent } from './components/forms/admin-homepage/admin-homepage.component';
import { AdminFormResourceComponent } from './components/forms/admin-resource/admin-resource.component';
import { AdminFormTeacherComponent } from './components/forms/admin-teacher/admin-teacher.component';
import { AdminFormTestimonialComponent } from './components/forms/admin-testimonial/admin-testimonial.component';
import { AdminFormUserComponent } from './components/forms/admin-user/admin-user.component';
// ADMIN
import { AdministrationComponent } from './pages/administration/administration.component';
import { AdminContactMessagesComponent } from './pages/administration/contact-messages/contact-messages.component';
import { AdminFaqComponent } from './pages/administration/faq/faq.component';
import { AdminHomepageComponent } from './pages/administration/homepage/homepage.component';
import { AdminMediaComponent } from './pages/administration/media/media.component';
import { AdminSignUpsComponent } from './pages/administration/sign-ups/sign-ups.component';
import { AdminTeachersComponent } from './pages/administration/teachers/teachers.component';
import { AdminUsersComponent } from './pages/administration/users/users.component';
import { AdminTestimonialsComponent } from './pages/administration/testimonials/testimonials.component';
import { AdminResourcesComponent } from './pages/administration/resources/resources.component';

// Services
import { AuthService, AlertMultiService, AlertService, ContactMessageService, FAQService, GalleryService
  , LiveChatService, ProjectService, ResourceService, SignupService, TestimonialService
  , TeacherService, UserService, UploadService, VisualizerService } from 'app/services/_index';

// pipes
import { ResourceCategoryPipe } from 'app/filters/resource-category-filter.pipe';
import { ImageFilterPipe } from 'app/filters/image-filter.pipe';
import { SignupFilterPipe } from 'app/filters/signup-filter.pipe';
import { ReadFilterPipe } from 'app/filters/read-filter.pipe';
import { DateRangePickerComponent } from './components/calendar/date-range-picker/date-range-picker.component';
import { SelectorSingleComponent } from './components/selector-single/selector-single.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';
import { BaseTilesComponent } from './components/tiles/base-tiles/base-tiles.component';
import { TileTestimonialComponent } from './components/tiles/tile-testimonial/tile-testimonial.component';
import { BubbleComponent } from './components/live-chat/bubble/bubble.component';
import { MenuPlusComponent } from './components/menus/menu-plus/menu-plus.component';
import { VisualizerComponent } from './components/visualizer/visualizer.component';
import { TileListViewswitchComponent } from './components/tile-list-viewswitch/tile-list-viewswitch.component';
import { TileCarouselComponent } from './components/image/tile-carousel/tile-carousel.component';

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
    { path: "messages", component: AdminContactMessagesComponent},
    { path: "chat", component: LiveChatManagerComponent},
    { path: "faq", component: AdminFaqComponent},
    { path: "media", component: AdminMediaComponent},
    { path: "resources", component: AdminResourcesComponent},
    { path: "signups", component: AdminSignUpsComponent},
    { path: "testimonials", component: AdminTestimonialsComponent},
    { path: "teachers", component: AdminTeachersComponent},
    { path: "users", component: AdminUsersComponent},
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
  { path: 'resources', component: ResourcesComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'teachers/:id', component: TeacherDetailComponent },
  //   // children: [
  //   //   { path: '', redirectTo: 'overview', pathMatch: 'full' },
  //     // { path: 'overview', component: Overview },
  //     // { path: 'specs', component: Specs }
  //   // ]
  // },
  { path: 'testimonials', component: TestimonialsComponent },
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
    AboutComponent,
    AdministrationComponent,
    AdminTeachersComponent,
    AdminFormUserComponent,
    AdminFormGalleryComponent,
    AdminFormTeacherComponent,
    AdminFormTestimonialComponent,
    AdminFormFaqComponent,
    AdminHomepageComponent,
    AdminSignUpsComponent,
    AdminHomepageComponent,
    AdminUsersComponent,
    AdminResourcesComponent,
    AdminFaqComponent,
    AdminTestimonialsComponent,
    TestimonialsComponent,
    AdminContactMessagesComponent,
    AdminMediaComponent,
    CalendarHeaderComponent,
    CalendoerComponent,
    CalendarNoteDayViewComponent,
    CalendoerEventModalComponent,
    ContactComponent,
    DateTimePickerComponent,
    FaqComponent,
    FooterComponent,
    GalleryComponent,
    HeaderComponent,
    HomeComponent,
    HomeLearntoplayComponent,
    HomeSplashComponent,
    HomeTeachersComponent,
    HomeTestimonialsComponent,
    HomeTilesComponent,
    ImageGalleryComponent,
    ImageFilterPipe,
    ResourceCategoryPipe,
    LearntoplayComponent,
    LiveChatComponent,
    LiveChatManagerComponent,
    LoginComponent,
    PageNotFoundComponent,
    PlaygroundComponent,
    ReadFilterPipe,
    SignupFilterPipe,
    TeacherDetailComponent,
    TeachersComponent,
    TodoerComponent,
    ThanksComponent,
    TileDisplayComponent,
    UserProfileComponent,
    WindowComponent,
    DateRangePickerComponent,
    SelectorSingleComponent,
    PageHeaderComponent,
    BaseTilesComponent,
    TileTestimonialComponent,
    AdminFormResourceComponent,
    ResourcesComponent,
    BubbleComponent,
    MenuPlusComponent,
    VisualizerComponent,
    TileListViewswitchComponent,
    TileCarouselComponent
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
    Daterangepicker,
    DialogModule,
    DragAndDropModule.forRoot(),
    // EmptyTextModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MenuModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    NgxGraphModule,
    NgxCarouselModule,
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
    UploadService,
    VisualizerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
