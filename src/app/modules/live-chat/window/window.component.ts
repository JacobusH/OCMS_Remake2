import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatePipe} from '@angular/common';
import { LiveChatComponent } from '../live-chat.component';  
import { LiveChat, LiveChatMessage } from 'app/models/_index';
import { LiveChatService } from 'app/services/_index';
import { slideUpDownAnimation } from 'app/animations/slide-up-down.animation';
import { Observable } from 'rxjs/Observable';
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
  selector: 'app-live-chat-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    slideUpDownAnimation
  ]
})
export class WindowComponent extends LiveChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  model: LiveChat = this.liveChatService.createNewLiveChat();
  windowLiveChatMessages: Observable<{}[]>; 
  slideState = 'up';
  currentChatKey: string;
  presence: string;
  sessionRunning: boolean = false;
  userEmail: string;
  userName: string;
  switch;

  constructor(protected liveChatService: LiveChatService) { 
    super(liveChatService);

    this.liveChatService.switchy.valueChanges().subscribe(x => {
      this.switch = x.isActive;
    })
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch (err) {}
  }

  beginChat(f: NgForm) {
    var test:any = this.model;
    this.userEmail = this.model.email;
    this.userName = this.model.name;

    let chatMsg:LiveChatMessage = this.liveChatService.createNewLiveChatMessage();
    chatMsg.message = test.message;

    let liveChatToSave = this.liveChatService.createNewLiveChat();
    liveChatToSave.email = test.email;
    liveChatToSave.name = test.name;

    let promise = this.liveChatService.save(liveChatToSave);
    
    promise.then(x => {
      this.currentChatKey = x.id;

      this.windowLiveChatMessages = this.liveChatService.liveChats.doc(x.id).collection('messages', ref => 
        ref.orderBy('createdAt', 'asc')).valueChanges();
      this.liveChatService.liveChats.doc(x.id).collection('messages').add(chatMsg);
    });

    this.sessionRunning = true;
    f.reset();
  }

  sendMessage(msg: any) {
    this.liveChatService.addLiveChatMessage(this.currentChatKey, msg, false);
  }

  markHasNewMessages() {
    this.liveChatService.markLiveChatUnreadMessage(this.currentChatKey, true);
  }

  toggleAnimationState() {
    this.slideState == 'down' ? this.slideState = 'up' : this.slideState = 'down';
  }

}
