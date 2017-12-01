import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Teacher } from 'app/models/_index';
import { TeacherService } from 'app/services/_index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeachersComponent implements OnInit {
  private teachers: Observable<{}[]>;

  constructor(private teacherService: TeacherService) { 
    this.teachers = this.teacherService.teachersActive.valueChanges();
  }

  ngOnInit() {
  }

}
