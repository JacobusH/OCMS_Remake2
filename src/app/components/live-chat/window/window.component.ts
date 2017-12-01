import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { LiveChatComponent } from 'app/components/live-chat/live-chat.component';  
import { LiveChat, LiveChatMessage } from 'app/models/_index';
import { LiveChatService } from 'app/services/_index';
import { slideUpDownAnimation } from 'app/animations/slide-up-down.animation';
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
  private model: LiveChat = this.liveChatService.createNewLiveChat();
  private windowLiveChatMessages: AngularFirestoreCollection<LiveChatMessage>; 
  private slideState = 'up';
  private currentChatKey: string;
  private liveChatMessages: AngularFirestoreCollection<LiveChat>; 
  private presence: string;
  private sessionRunning: boolean = false;
  private userEmail: string;
  private userName: string;

  constructor(protected liveChatService: LiveChatService) { 
    super(liveChatService);
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
    liveChatToSave.messages.push(chatMsg); 

    let promise = this.liveChatService.save(liveChatToSave);
    
    promise.then(x => {
      this.currentChatKey = x.id;
    });

    // this.liveChatMessages = this.af.getLiveChatMessagesByParentKey(this.currentChatKey);
    // console.log(this.liveChatMessages);


    // this.model = {};
    this.sessionRunning = true;
    f.reset();
  }

  toggleAnimationState() {
    this.slideState == 'down' ? this.slideState = 'up' : this.slideState = 'down';
  }

}
