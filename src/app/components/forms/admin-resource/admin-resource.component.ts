import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Resource } from 'app/models/_index';
import { ResourceService } from 'app/services/_index';
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
  selector: 'app-admin-form-resource',
  templateUrl: './admin-resource.component.html',
  styleUrls: ['./admin-resource.component.scss']
})
export class AdminFormResourceComponent implements OnInit {
  model = this.resourceService.createNew();
  selectedResource: Resource;
  resources: Observable<{}[]>;

  constructor(private resourceService: ResourceService) { 
    this.resources = this.resourceService.resources.valueChanges();
  }

  ngOnInit() {
  }

  saveResource(form: NgForm) {
    // uploading new teacher with picture
    if(this.selectedResource == null) {
      this.resourceService.save(this.model)
      this.model = this.resourceService.createNew();
      form.reset();
    }
    // editing testimonial
    else {
      this.resourceService.edit(this.selectedResource)
      form.reset();
    }
  }

  setNewResource() {
    this.selectedResource = null;
    this.model = this.resourceService.createNew();
  }

  setSelectedResource(re: Resource) {
    this.selectedResource = re;
    this.model = re;
  }

  deleteResource(form: NgForm) {
    form.reset();
    this.resourceService.delete(this.selectedResource);
  }


}
