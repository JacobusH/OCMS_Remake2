import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Advert, Upload } from 'app/models/_index';
import { AdvertService, UploadService } from 'app/services/_index';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-advert',
  templateUrl: './admin-advert.component.html',
  styleUrls: ['./admin-advert.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminAdvertComponent implements OnInit {
  model = this.advertService.createNew();
  @ViewChild('fileUpload') fileUploadVar: any;
  @ViewChild('imgItemSelected') imgItemSelected: any;
  showForm: boolean = false;
  selectedItem: Advert;
  selectedFiles: FileList;
  selectedPicture: string;
  currentUpload: Upload;
  items: Observable<Advert[]>;
  firebaseUrl: string = 'gs://ocmusicschool-11817.appspot.com/';
  basePathGallery:string = '/gallery';
  basePathTeachers:string = '/teachers';
  basePathAdverts:string = '/adverts';

  storage = firebase.storage();
  storageRef = this.storage.ref();

  forceAdvert: boolean;

  constructor(private advertService: AdvertService, private upsvc: UploadService) { 
    this.items = this.advertService.adverts.valueChanges();
    this.advertService.forceAdvert.valueChanges().subscribe(x => {
      console.log('forecy', x.forceShow)
      this.forceAdvert = x.forceShow;
    });
  }

  ngOnInit() {
  }

  flipSwitch() {
    this.advertService.flipSwitch(this.forceAdvert);
  }

  saveItem(form: NgForm) {
    // uploading new teacher with picture
    if(this.selectedFiles != null) {
      this.uploadSingleItem();
      this.model = this.advertService.createNew();
      this.fileUploadVar.nativeElement.value = "";
      form.reset();
    }
    // editing teacher
    else if(this.selectedItem != null) {
      this.advertService.edit(this.selectedItem)

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

    this.upsvc.pushAdvertUpload(this.currentUpload, 'adverts', this.model);
  }

  setNewItem() {
    this.selectedItem = null;
    this.model = this.advertService.createNew();
    this.imgItemSelected.nativeElement.src = "";
    this.showForm = true;
  }

  setSelectedItem(item: Advert) {
    this.selectedItem = item;
    this.model = item;

    let itemRef = this.storageRef.child(item.imgUrl);
    itemRef.getDownloadURL().then((url) => {
      this.selectedPicture = url;
    })
    .catch((err) => {
      console.log(err);
    });
   
    this.showForm = true;
  }

  deleteItem(form: NgForm) {
    this.fileUploadVar.nativeElement.value = "";
    form.reset();
    this.advertService.delete(this.selectedItem);
  }

}
