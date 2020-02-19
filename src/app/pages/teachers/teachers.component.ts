import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Teacher } from 'app/models/_index';
import { TeacherService } from 'app/services/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeachersComponent implements OnInit {
 

  constructor() { 
    
  }

  ngOnInit() {
  }

}
