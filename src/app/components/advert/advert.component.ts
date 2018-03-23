import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdvertService } from 'app/services/advert.service';
import { Advert } from 'app/models/advert.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
  activeAdvertImgUrl: string;

  constructor(private advertService: AdvertService) { }

  ngOnInit() {
    this.advertService.advertsActive.valueChanges().subscribe(advert => {
      if(advert) {
        this.activeAdvertImgUrl = advert[0].imgUrl;
      }
    })
  }

}
