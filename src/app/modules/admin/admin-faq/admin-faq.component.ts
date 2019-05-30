import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FAQ } from 'app/models/_index';
import { FAQService } from 'app/services/_index';
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
  selector: 'app-admin-form-faq',
  templateUrl: './admin-faq.component.html',
  styleUrls: ['./admin-faq.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminFormFaqComponent implements OnInit {
  model = this.faqService.createNew();
  selectedFAQ: FAQ;
  faqs: Observable<{}[]>;
  view: any;

  constructor(private faqService: FAQService) { 
    this.faqs = this.faqService.faqs.valueChanges();
  }

  ngOnInit() {
  }

  saveFAQ(form: NgForm) {
    // uploading new teacher with picture
    if(this.selectedFAQ == null) {
      this.faqService.save(this.model)
      this.model = this.faqService.createNew();
      form.reset();
    }
    // editing testimonial
    else {
      this.faqService.edit(this.selectedFAQ)
      form.reset();
    }
  }

  setNewFAQ() {
    this.selectedFAQ = null;
    this.model = this.faqService.createNew();
  }

  setSelectedFAQ(faq: FAQ) {
    this.selectedFAQ = faq;
    this.model = faq;
  }

  deleteFAQ(form: NgForm) {
    form.reset();
    this.faqService.delete(this.selectedFAQ);
  }

}
