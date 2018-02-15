import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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
  private model = this.videoService.createNew();
  selectedItem: VideoItem;
  private items: Observable<VideoItem[]>;


  constructor(private videoService: VideoItemService) { 
    this.items = this.videoService.videoItems.valueChanges();
  }

  ngOnInit() {
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
