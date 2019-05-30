import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Teacher } from 'app/models/_index';
import { TeacherService } from 'app/services/_index';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-teacher-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeacherDetailComponent implements OnInit, OnDestroy {
  key: string;
  sub: any;
  teacherObj: any;
  teacher: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private teacherService: TeacherService) { 

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.teacher = this.teacherService.teachers.doc(params['id']).valueChanges();
   });
  }

  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
