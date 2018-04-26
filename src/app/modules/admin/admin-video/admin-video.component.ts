import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { VideoItem, Upload } from 'app/models/_index';
import { VideoItemService } from 'app/services/_index';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-admin-form-video',
  templateUrl: './admin-video.component.html',
  styleUrls: ['./admin-video.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminFormVideoComponent implements OnInit {
  model = this.videoService.createNew();
  selectedItem: VideoItem;
  items: Observable<VideoItem[]>;
  filterMetadata: any;

  @Input() filterBy?: string = 'all';
  filterOptions: Array<string> = [];

  currentPage: number = 0;
  totalPages: number = 1;
  pageSize: number = 10;


  constructor(private videoService: VideoItemService) { 
    
  }

  ngOnInit() {
    this.items = this.videoService.videoItems.valueChanges();

    this.items.subscribe(x => {

      for(var i = 0; i < x.length; i++) {
        let splits = x[i].categories.split(',');
        for(var j = 0; j < splits.length; j++) {
          var element = splits[j].replace(/\s/g, '');
          if(this.filterOptions.indexOf(element) === -1) {
            this.filterOptions.push(element);
          }
        }
      }

    })
  }

  filterClicked(filterApplied: string) {
    this.filterBy = filterApplied; 
 }

  saveItem(form: NgForm) {
    // editing item
    if(this.selectedItem != null) {
      this.videoService.edit(this.selectedItem)
      form.reset();
    }
    else { // new item
      this.videoService.save(this.model);
      this.model = this.videoService.createNew();
      form.reset();
    }
  }

  setNewItem() {
    this.selectedItem = null;
    this.model = this.videoService.createNew();
  }

  setSelectedItem(item: VideoItem) {
    this.selectedItem = item;
    this.model = item;
  }

  deleteItem(form: NgForm) {
    form.reset();
    this.videoService.delete(this.selectedItem);
  }
}
