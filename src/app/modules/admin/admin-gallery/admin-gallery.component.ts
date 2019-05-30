import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { GalleryItem, Upload } from 'app/models/_index';
import { GalleryService, UploadService } from 'app/services/_index';
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
  selector: 'app-admin-form-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminFormGalleryComponent implements OnInit {
  model = this.galleryService.createNew();
  @ViewChild('fileUpload') fileUploadVar: any;
  @ViewChild('imgItemSelected') imgItemSelected: any;
  selectedItem: GalleryItem;
  selectedFiles: FileList;
  selectedPicture: string;
  currentUpload: Upload;
  items: Observable<GalleryItem[]>;
  firebaseUrl: string = 'gs://ocmusicschool-11817.appspot.com/';
  basePathGallery:string = '/gallery';
  basePathTeachers:string = '/teachers';

  storage = firebase.storage();
  storageRef = this.storage.ref();

  constructor(private galleryService: GalleryService, private upsvc: UploadService) { 
    this.items = this.galleryService.gallery.valueChanges();
  }

  ngOnInit() {
  }

  saveItem(form: NgForm) {
    // uploading new teacher with picture
    if(this.selectedFiles != null) {
      this.uploadSingleItem();
      this.model = this.galleryService.createNew();
      this.fileUploadVar.nativeElement.value = "";
      form.reset();
    }
    // editing teacher
    else if(this.selectedItem != null) {
      this.galleryService.edit(this.selectedItem)

      this.fileUploadVar.nativeElement.value = "";
      form.reset();
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingleItem() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    this.upsvc.pushGalleryUpload(this.currentUpload, 'gallery', this.model);
  }

  setNewItem() {
    this.selectedItem = null;
    this.model = this.galleryService.createNew();
    this.imgItemSelected.nativeElement.src = "";
  }

  setSelectedItem(item: GalleryItem) {
    this.selectedItem = item;
    this.model = item;

    let itemRef = this.storageRef.child(item.imgUrl);
    itemRef.getDownloadURL().then((url) => {
      this.selectedPicture = url;
    })
    .catch((err) => {
      console.log(err);
    });
   
  }

  deleteItem(form: NgForm) {
    this.fileUploadVar.nativeElement.value = "";
    form.reset();
    this.galleryService.delete(this.selectedItem);
  }

}
