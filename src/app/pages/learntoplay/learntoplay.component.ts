import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Signup } from 'app/models/_index';
import { SignupService } from 'app/services/_index';
import {  } from 'app/models/_index';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';

@Component({
  selector: 'app-learntoplay',
  templateUrl: './learntoplay.component.html',
  styleUrls: ['./learntoplay.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LearntoplayComponent implements OnInit {
  model = this.signupService.createNew();
  id: string;
  sub: any;
  ltpForm: FormGroup;

  constructor(private signupService: SignupService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.model = this.signupService.createNew();
      this.model.instrument = this.id;
   });
  }

  saveLTP(f: NgForm) {
    console.log('new ltp: ', this.model);
    this.signupService.save(this.model);
    f.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
