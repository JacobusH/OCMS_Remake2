import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, Upload } from 'app/models/_index';
import { UserService, UploadService } from 'app/services/_index';
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
  selector: 'app-admin-form-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminFormUserComponent implements OnInit {
  @ViewChild('admin') isAdmin: any;
  @ViewChild('student') student: any;
  @ViewChild('teacher') teacher: any;
  private model = this.userService.createNew();
  selectedUser: User;
  private users: Observable<User[]>;

  private roles = ['admin', 'student', 'teacher'];

  constructor(private userService: UserService, private upsvc: UploadService) { 
    this.users = this.userService.users.valueChanges();

    this.users.subscribe(us => {
      console.log(us);
    })
  }

  ngOnInit() {
  }

  saveUser(form: NgForm) {
    this.student;

    // editing user
    if(this.selectedUser != null) {
      this.userService.edit(this.selectedUser)

      form.reset();
    }
  }

  setNewUser() {
    this.selectedUser = null;
    this.model = this.userService.createNew();
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
    this.model = user;
  }

  deleteUser(form: NgForm) {
    form.reset();

    this.userService.users.doc(this.selectedUser.key).update({isActive: false});
    // this.userService.delete(this.selectedUser);
  }

}
