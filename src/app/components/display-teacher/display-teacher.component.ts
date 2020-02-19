import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Teacher } from 'app/models/_index';
import { TeacherService } from 'app/services/_index';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-display-teacher',
  templateUrl: './display-teacher.component.html',
  styleUrls: ['./display-teacher.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DisplayTeacherComponent implements OnInit {
  teachers: Observable<Teacher[]>;

  constructor(private afs: AngularFirestore, private teacherService: TeacherService) { 
    this.teachers = this.teacherService.teachersActive.valueChanges();
  }

  ngOnInit() {
  }

}
