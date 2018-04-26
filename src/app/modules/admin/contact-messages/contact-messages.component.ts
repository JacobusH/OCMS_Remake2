import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ContactMessage } from 'app/models/_index';
import { ContactMessageService } from 'app/services/_index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrls: ['./contact-messages.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminContactMessagesComponent implements OnInit {
  @Input() readFilterBy?: string = 'all';
  messages: Observable<{}[]>;
  readFilter = [
    {value: 'all', viewValue: 'All'},  
    {value: 'Read', viewValue: 'Read'},  
    {value: 'Unread', viewValue: 'Unread'}
  ];

  constructor(private contactMessageService: ContactMessageService, private afs: AngularFirestore) { 
    this.messages = this.contactMessageService.contactMessages.valueChanges();
  }

  ngOnInit() {
  }

  readClicked(event, msg: ContactMessage) {
    msg.read = !msg.read;
    this.contactMessageService.edit(msg);
  }

  readFilterClicked(sel: string) {
    this.readFilterBy = sel; 
  }

  selectedDate(event) {
    this.messages = this.afs.collection('contactMessages', 
      ref => ref.where('createdAt', '>=', new Date(event.start))
        .where('createdAt', '<=', new Date(event.end))).valueChanges();

  }

}
