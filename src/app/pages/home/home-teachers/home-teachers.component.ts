import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Teacher } from 'app/models/_index';
import { TeacherService } from 'app/services/_index';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-home-teachers',
  templateUrl: './home-teachers.component.html',
  styleUrls: ['./home-teachers.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeTeachersComponent implements OnInit {
  teachers: Observable<Teacher[]>;

  constructor(private afs: AngularFirestore, private teacherService: TeacherService) { 
    this.teachers = this.teacherService.teachersActive.valueChanges();
  }

  ngOnInit() {
  }

}
