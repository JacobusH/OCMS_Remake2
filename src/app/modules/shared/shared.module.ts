import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';


// Components
import { TileListViewswitchComponent } from './tile-list-viewswitch/tile-list-viewswitch.component'
import { ItemComponent } from './tile-list-viewswitch/item/item.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { VideoItemComponent } from './video-item/video-item.component';
import { ImageGalleryComponent } from './image/image-gallery/image-gallery.component';
import { TileDisplayComponent } from './image/tile-display/tile-display.component';

// Filters
import { ImageFilterPipe } from './filters/image-filter.pipe';
import { ReadFilterPipe } from './filters/read-filter.pipe';
import { ResourceCategoryPipe } from './filters/resource-category-filter.pipe';
import { RoundUpPipe } from './filters/roundUp-filter.pipe';
import { SignupFilterPipe } from './filters/signup-filter.pipe';
import { TimesPipe } from './filters/times-filter.pipe';
import { ReadMoreComponent } from './read-more/read-more.component';


@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DateRangePickerComponent,
    ItemComponent,
    PageHeaderComponent,
    TileListViewswitchComponent,
    VideoItemComponent,
    ImageFilterPipe,
    ReadFilterPipe,
    ReadMoreComponent,
    ResourceCategoryPipe,
    RoundUpPipe,
    SignupFilterPipe,
    TimesPipe,
    ImageGalleryComponent,
    TileDisplayComponent
  ],
  imports: [
    CommonModule,
    Daterangepicker,
    YoutubePlayerModule,
  ],
  declarations: [
    DateRangePickerComponent,
    ImageFilterPipe,
    ImageGalleryComponent,
    ItemComponent,
    PageHeaderComponent,
    ReadMoreComponent,
    ReadFilterPipe,
    ResourceCategoryPipe,
    RoundUpPipe,
    SignupFilterPipe,
    TileListViewswitchComponent,
    TileDisplayComponent,
    TimesPipe,
    VideoItemComponent
  ],
  providers: [
    ImageFilterPipe,
    ReadFilterPipe,
    ResourceCategoryPipe,
    RoundUpPipe,
    SignupFilterPipe,
    TimesPipe
  ]
})
export class SharedModule { 
  
}
