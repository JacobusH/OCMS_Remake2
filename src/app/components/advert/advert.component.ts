import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdvertService } from 'app/services/advert.service';
import { Advert } from 'app/models/advert.model';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
  activeAdvertImgUrl: string = "";

  constructor(private advertService: AdvertService
  , public dialog: MatDialog) { }

  ngOnInit() {

    this.advertService.advertsActive.valueChanges().subscribe(adverts => {
      if(adverts.length > 0) {
        this.activeAdvertImgUrl = adverts[0].imgUrl;
      }
    })

  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
