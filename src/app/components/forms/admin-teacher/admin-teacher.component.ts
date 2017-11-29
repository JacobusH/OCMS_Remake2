import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Teacher, Upload } from 'app/models/_index';
import { TeacherService, UploadService } from 'app/services/_index';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
import { AdminTeachersComponent } from 'app/pages/administration/teachers/teachers.component';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-form-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminFormTeacherComponent implements OnInit {
  private model = this.teacherService.createNew();
  @ViewChild('fileUpload') fileUploadVar: any;
  @ViewChild('imgTeacherSelected') imgTeacherSelected: any;
  selectedTeacher: Teacher;
  selectedFiles: FileList;
  selectedPicture: string;
  currentUpload: Upload;
  private teachers: Observable<Teacher[]>;
  private firebaseUrl: string = 'gs://ocmusicschool-11817.appspot.com/';
  private basePathGallery:string = '/gallery';
  private basePathTeachers:string = '/teachers';

  storage = firebase.storage();
  storageRef = this.storage.ref();

  constructor(private teacherService: TeacherService, private upsvc: UploadService) { 
    this.teachers = this.teacherService.teachers.valueChanges();
  }

  ngOnInit() {
  }

  saveTeacher(form: NgForm) {
    // uploading new teacher with picture
    if(this.selectedFiles != null) {
      this.uploadSingleTeacher();
      this.model = this.teacherService.createNew();
      this.fileUploadVar.nativeElement.value = "";
      form.reset();
    }
    // editing teacher
    else if(this.selectedTeacher != null) {
      this.teacherService.edit(this.selectedTeacher)

      this.fileUploadVar.nativeElement.value = "";
      form.reset();
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingleTeacher() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    this.upsvc.pushTeacherUpload(this.currentUpload, 'teacher', this.model);

    
  }

  setNewTeacher() {
    this.selectedTeacher = null;
    this.model = this.teacherService.createNew();
    this.imgTeacherSelected.nativeElement.src = "";
  }

  setSelectedTeacher(teacher: Teacher) {
    this.selectedTeacher = teacher;
    this.model = teacher;

    let teacherRef = this.storageRef.child(teacher.imgUrl);
    teacherRef.getDownloadURL().then((url) => {
      this.selectedPicture = url;
    })
    .catch((err) => {
      console.log(err);
    });
   
  }

  deleteTeacher(form: NgForm) {
    this.fileUploadVar.nativeElement.value = "";
    form.reset();
    this.teacherService.delete(this.selectedTeacher);
  }

}
