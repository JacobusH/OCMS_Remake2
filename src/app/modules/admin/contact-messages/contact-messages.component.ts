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
  visMsgs; 
  numMsgs = 5;
  readFilter = [
    {value: 'all', viewValue: 'All'},  
    {value: 'Read', viewValue: 'Read'},  
    {value: 'Unread', viewValue: 'Unread'}
  ];

  constructor(private contactMessageService: ContactMessageService, private afs: AngularFirestore) { 
    this.messages = this.contactMessageService.contactMessages.valueChanges();
  }

  ngOnInit() {
    this.getNumMsgs(5);
  }

  getNumMsgs(howMany: number) {
    howMany = +howMany;
    this.contactMessageService.getNumMsgs(howMany).valueChanges().subscribe(x => {
      this.visMsgs = x;
    })
  }

  readClicked(event, msg: ContactMessage) {
    msg.read = !msg.read;
    this.contactMessageService.edit(msg);
  }

  readFilterClicked(sel: string) {
    this.readFilterBy = sel; 
  }

  selectedDate(event) {
    let start = new Date(event.start);
    let end = new Date(event.end);
    this.contactMessageService.getMsgsRange(start, end).valueChanges().subscribe(x => {
      this.visMsgs = x;
    })
  }

}
