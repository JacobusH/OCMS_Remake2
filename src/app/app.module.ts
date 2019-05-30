// Modules
// import { ArithmeticModule, SumService } from '../../node_modules/todo-module/dist';
// import { HeaderModule } from 'my-component-library';
// import { TodoModule } from 'rave-todo';
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { LiveChatModule } from './modules/live-chat/live-chat.module';
import { AccordionModule } from 'ngx-accordion'; 
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ButtonModule, DialogModule, OrderListModule, MenuModule, MenuItem, Footer } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph'
import { NgxCarouselModule } from 'ngx-carousel';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { MatButtonModule, MatCheckboxModule   
  , MatDialogModule, MatMenuModule 
  , MatFormFieldModule, MatSidenavModule
  , MatSelectModule, MatInputModule
  , MatIconModule, MatIconRegistry  
  , MatGridListModule, MatCardModule
  , MatExpansionModule, MatOptionModule
} from '@angular/material';
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
import { VideosComponent } from './pages/videos/videos.component';

// Components
import { AppComponent } from './app.component';
import { ImageGalleryComponent } from './components/image/image-gallery/image-gallery.component';
import { TileDisplayComponent } from './components/image/tile-display/tile-display.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Directives
import { LazyLoadDirective } from './directives/lazy-load-image';

// FORMS
// ADMIN
import { AdministrationComponent } from './pages/administration/administration.component';
import { AdminHomepageComponent } from './pages/administration/homepage/homepage.component';

// Services
import { AdvertService, AnnouncementService, AuthService, AlertMultiService, AlertService, ContactMessageService, FAQService, GalleryService
  , LiveChatService, ProjectService, ResourceService, SignupService, TestimonialService
  , TeacherService, UserService, UploadService, VideoItemService } from 'app/services/_index';

// pipes
import { BaseTilesComponent } from './components/tiles/base-tiles/base-tiles.component';
import { TileTestimonialComponent } from './components/tiles/tile-testimonial/tile-testimonial.component';
import { MenuPlusComponent } from './components/menus/menu-plus/menu-plus.component';
import { TileCarouselComponent } from './components/image/tile-carousel/tile-carousel.component';
import { HomeVideoComponent } from './pages/home/home-video/home-video.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { DisplayTeacherComponent } from './components/display-teacher/display-teacher.component';
import { AdvertComponent } from './components/advert/advert.component';
import { HomeNewsComponent } from './pages/home/home-news/home-news.component';

// Routing
import { routing } from './app.routing';
import { HomeGalleryComponent } from './pages/home/home-gallery/home-gallery.component';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCFToauOWTjn55Oc2e6L1YkCt5ZGzbMXV8",
  authDomain: "ocmusicschool-11817.firebaseapp.com",
  databaseURL: "https://ocmusicschool-11817.firebaseio.com",
  projectId: "ocmusicschool-11817",
  storageBucket: "ocmusicschool-11817.appspot.com",
  messagingSenderId: "202663817255"
};



@NgModule({
  entryComponents: [
    // CalendoerEventModalComponent,
    AdvertComponent,
    AnnouncementsComponent
  ],
  declarations: [
    // ToDoComponent,
    LazyLoadDirective,
    AppComponent,
    AboutComponent,
    AdministrationComponent,
    AdminHomepageComponent,
    AdminHomepageComponent,
    TestimonialsComponent,
    ContactComponent,
    FaqComponent,
    GalleryComponent,
    HomeComponent,
    HomeLearntoplayComponent,
    HomeSplashComponent,
    HomeTeachersComponent,
    HomeTestimonialsComponent,
    HomeTilesComponent,
    ImageGalleryComponent,
    LearntoplayComponent,
    LoginComponent,
    PageNotFoundComponent,
    PlaygroundComponent,
    TeacherDetailComponent,
    TeachersComponent,
    ThanksComponent,
    TileDisplayComponent,
    UserProfileComponent,
    BaseTilesComponent,
    TileTestimonialComponent,
    ResourcesComponent,
    MenuPlusComponent,
    TileCarouselComponent,
    HomeVideoComponent,
    AnnouncementsComponent,
    VideosComponent,
    DisplayTeacherComponent,
    AdvertComponent,
    HomeNewsComponent, 
    HeaderComponent,
    FooterComponent,
    HomeGalleryComponent
  ],
  imports: [ 
    // ArithmeticModule,
    // HeaderModule, 
    // TodoModule,
    routing,
    SharedModule,
    AdminModule,
    LiveChatModule,
    AccordionModule, 
    BrowserModule, 
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule.forRoot(),
    DialogModule,
    DragAndDropModule.forRoot(),
    // EmptyTextModule,
    FormsModule,
    HttpClientModule,
    MenuModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    NgxGraphModule,
    NgxCarouselModule,
    OrderListModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(routes),
    TreeModule,
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
  providers: [
    // SumService,
    AdvertService,
    AnnouncementService,
    AdminGuard,
    AuthGuard,
    AlertService,
    AlertMultiService,
    AuthService, 
    AngularFireAuth,
    ContactMessageService,
    FAQService,
    GalleryService,
    LiveChatService,
    ProjectService,
    ResourceService,
    SignupService,
    TestimonialService,
    TeacherService,
    UserService,
    UploadService,
    VideoItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
