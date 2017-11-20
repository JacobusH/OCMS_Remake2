import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { LiveChatComponent } from 'app/components/live-chat/live-chat.component';  
import { LiveChat, LiveChatMessage } from 'app/models/_index';
import { LiveChatService } from 'app/services/_index';
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
  encapsulation: ViewEncapsulation.None
})
export class WindowComponent extends LiveChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private windowLiveChatMessages: AngularFirestoreCollection<LiveChatMessage>; 

  constructor(protected liveChatService: LiveChatService) { 
    super(liveChatService)
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

    // let chatMsg = new LiveChatMessage(test.message, this.af.getCurrentDateTime(), this.af.getInvertedDate(), false, false);
    // let chatMsg = new LiveChatMessage(f.message, new Date(), ;
    // let chatMsg = new LiveChatMessage(test.message, this.af.getCurrentDateTime(), this.af.getInvertedDate(), false, false);
    // let liveChatToSave = new LiveChat('', this.model.name, this.model.email, '', 0, -1, true, true, new Array<LiveChatMessage>(chatMsg));
    // this.currentChatKey = this.af.saveLivechat(liveChatToSave);
    
    // this.liveChatMessages = this.af.getLiveChatMessagesByParentKey(this.currentChatKey);
    // console.log(this.liveChatMessages);


    this.model = new LiveChat();
    this.sessionRunning = true;
    f.reset();
  }

}
