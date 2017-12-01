import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, AfterViewChecked, ElementRef, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
// import { LiveChatStatusService } from 'app/providers/liveChatStatus.service';
// import { slideUpDownAnimation, highlightAnimation } from 'app/animations/_index';
import { LiveChat, LiveChatMessage } from 'app/models/_index';
import { LiveChatService } from 'app/services/_index';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LiveChatComponent implements OnInit {

  constructor(protected liveChatService: LiveChatService) {
    // this.liveChatMessages = liveChatService.liveChatsByDateNonArchived;
   }

  ngOnInit() {
  }

}
