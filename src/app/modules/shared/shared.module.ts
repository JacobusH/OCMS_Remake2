import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';

// Components
import { TileListViewswitchComponent } from './tile-list-viewswitch/tile-list-viewswitch.component'
import { ItemComponent } from './tile-list-viewswitch/item/item.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';

@NgModule({
  exports: [
    DateRangePickerComponent,
    FooterComponent,
    HeaderComponent,
    ItemComponent,
    PageHeaderComponent,
    TileListViewswitchComponent,
  ],
  imports: [
    CommonModule,
    Daterangepicker
  ],
  declarations: [
    DateRangePickerComponent,
    FooterComponent,
    HeaderComponent,
    ItemComponent,
    PageHeaderComponent,
    TileListViewswitchComponent,
  ],
  providers: [

  ]
})
export class SharedModule { }
