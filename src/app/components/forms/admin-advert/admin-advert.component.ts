import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Advert, Upload } from 'app/models/_index';
import { AdvertService, UploadService } from 'app/services/_index';
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
  selector: 'app-admin-advert',
  templateUrl: './admin-advert.component.html',
  styleUrls: ['./admin-advert.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminAdvertComponent implements OnInit {
  private model = this.advertService.createNew();
  @ViewChild('fileUpload') fileUploadVar: any;
  @ViewChild('imgItemSelected') imgItemSelected: any;
  selectedItem: Advert;
  selectedFiles: FileList;
  selectedPicture: string;
  currentUpload: Upload;
  private items: Observable<Advert[]>;
  private firebaseUrl: string = 'gs://ocmusicschool-11817.appspot.com/';
  private basePathGallery:string = '/gallery';
  private basePathTeachers:string = '/teachers';
  private basePathAdverts:string = '/adverts';

  storage = firebase.storage();
  storageRef = this.storage.ref();

  constructor(private advertService: AdvertService, private upsvc: UploadService) { 
    this.items = this.advertService.adverts.valueChanges();
  }

  ngOnInit() {
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
   
  }

  deleteItem(form: NgForm) {
    this.fileUploadVar.nativeElement.value = "";
    form.reset();
    this.advertService.delete(this.selectedItem);
  }

}
