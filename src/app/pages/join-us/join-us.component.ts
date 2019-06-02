import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinUsService } from 'app/services/join-us.service';
import { UploadService } from 'app/services/upload.service';
import { JoinUs, Upload } from 'app/models/_index';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class JoinUsComponent implements OnInit {
  @ViewChild('fileUpload') fileUploadVar: any;
  model = this.joinService.createNew();
  sub: any;
  id: any;
  selectedFiles: FileList;
  currentUpload: Upload;
  fileNoTouch = true;
  fileUploaded = false;

  basePathCV:string = '/cvs';
  firebaseUrl: string = 'gs://ocmusicschool-11817.appspot.com/';
  storage = firebase.storage();
  storageRef = this.storage.ref();

  constructor(private joinService: JoinUsService
    , private router: Router
    , private route:ActivatedRoute
    , private upsvc: UploadService) { 
    
  }

  ngOnInit() {
  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = params['id'];
  //     if(this.id == 'summercamp') {
  //       this.model = this.contactService.createNew();
  //       this.model.message = 'I am interested in coming to Summer Boot Camp!';
  //     }
  //  });
  }


  saveItem(form: NgForm) {
    this.fileNoTouch = false;
    // uploading new join application with cv
    if(this.selectedFiles != null) {
      this.uploadSingleItem();
      this.model = this.joinService.createNew();
      this.fileUploadVar.nativeElement.value = "";
      form.reset();
      this.router.navigate(['thanks'], {relativeTo: this.route});
    }

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.fileNoTouch = false;
    this.fileUploaded = true;
  }

  uploadSingleItem() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    this.upsvc.pushUpload(this.currentUpload, 'join-us', this.model);
    this.fileNoTouch = false;
    this.fileUploaded = true;
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
