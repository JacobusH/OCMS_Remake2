import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import "firebase/storage";
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Upload, Teacher, GalleryItem, Advert } from 'app/models/_index';
import { TeacherService, GalleryService, AdvertService, JoinUsService } from 'app/services/_index';

@Injectable()
export class UploadService {
  basePathGallery:string = '/gallery';
  basePathTeachers:string = '/teachers';
  
  storage = firebase.storage();
  storageRef = this.storage.ref();


  constructor(private teacherService: TeacherService
    , private joinService: JoinUsService
    , private galleryService: GalleryService
    , private advertService:AdvertService) { 

  }

  pushUpload(upload: Upload, location: string, model: any) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${location}/${upload.file.name}`).put(upload.file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      next : (snapshot) => {
      // upload in progress
      upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, error: (error) => {
      // upload failed
      console.log(error)
    }, complete: () => {
      // upload success
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      // this.saveTeacherFileData(upload);

      let fileName = upload.name;
      switch(location) {
        case 'teacher': 
          model.imgUrl = 'teacher/' + fileName;
          this.teacherService.save(model, upload);
          break;
        case 'gallery':
          model.imgUrl = 'gallery/' + fileName;
          this.galleryService.save(model, upload);
          break;
        case 'adverts':
          model.imgUrl = 'adverts/' + fileName;
          this.advertService.save(model, upload);
          break;
        case 'join-us':
          model.imgUrl = 'join-us/' + fileName;
          this.joinService.save(model, upload);
          break;
      }
    }});
  }

  pushTeacherUpload(upload: Upload, location: string, model: any) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${location}/${upload.file.name}`).put(upload.file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      next : (snapshot) => {
      // upload in progress
      upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, error: (error) => {
      // upload failed
      console.log(error)
    }, complete: () => {
      // upload success
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      // this.saveTeacherFileData(upload);

      let fileName = upload.name;
      model.imgUrl = 'teacher/' + fileName;
      
      this.teacherService.save(model, upload);
    }});
  }

  pushGalleryUpload(upload: Upload, location: string, model: any) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${location}/${upload.file.name}`).put(upload.file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      next : (snapshot) => {
      // upload in progress
      upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, error: (error) => {
      // upload failed
      console.log(error)
    }, complete: () => {
      // upload success
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      // this.saveGalleryFileData(upload);

      let fileName = upload.name;
      model.imgUrl = 'gallery/' + fileName;
      
      this.galleryService.save(model, upload);
    }});
  }

  pushAdvertUpload(upload: Upload, location: string, model: any) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${location}/${upload.file.name}`).put(upload.file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      next : (snapshot) => {
      // upload in progress
      upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, error: (error) => {
      // upload failed
      console.log(error)
    }, complete: () => {
      // upload success
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      // this.saveGalleryFileData(upload);

      let fileName = upload.name;
      model.imgUrl = 'adverts/' + fileName;
      
      this.advertService.save(model, upload);
    }});
  }

  deleteUpload(upload: Upload) {
    // this.deleteFileData(upload.key)
    // .then( () => {
      this.deleteFileStorage(upload.name)
    // })
    // .catch(error => console.log(error))
  }

  // // Deletes the file details from the realtime db
  // deleteFileData(key: string) {
  //   return this.db.list(`${this.basePathGallery}/`).remove(key);
  // }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePathGallery}/${name}`).delete()
  }

  // // Writes the file details to the realtime db
  // saveGalleryFileData(upload: Upload) {
  //   this.db.list(`${this.basePathGallery}/`).push(upload);
  // }

  // // Writes the file details to the realtime db
  // saveTeacherFileData(upload: Upload) {
  //   let teacherRef = this.storageRef.child('teacher/' + upload.name);
  //   teacherRef.getDownloadURL().then((url) => {
  //     // this.selectedPicture = url;
  //     this.teacherService.teachers.doc() object("teacherUploads/" + promise.key).update({itemUrl: url});
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

}