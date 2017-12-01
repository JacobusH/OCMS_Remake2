import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LiveChat, LiveChatMessage } from 'app/models/_index';
import { LiveChatService } from 'app/services/_index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-live-chat-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LiveChatManagerComponent implements OnInit {
  private liveChatsByDate;
  private liveChatSwitch;
  private currentLiveChat;
  private currentLiveChatKey;
  private currentLiveChatMessages;

  constructor(private liveChatService: LiveChatService) { 
    this.liveChatsByDate = this.liveChatService.liveChatsByDate.valueChanges();

    // this.liveChatsByDate.subscribe(x => console.log(x));


    this.liveChatService.switchy.valueChanges().subscribe(x => {
      this.liveChatSwitch = x.isActive;
    });

    
    
  }

  ngOnInit() {
  }

  setCurrentLiveChat(key: string) {
    this.currentLiveChatKey = key;
    this.currentLiveChat = this.liveChatService.getLiveChatByKey(key).valueChanges();
    this.currentLiveChatMessages = this.liveChatService.getMessagesByKey(key).valueChanges();
  }

  markNoNewMessages() {
    this.liveChatService.markLiveChatUnreadMessage(this.currentLiveChatKey, false);
  }

  getMessagesByKey(key: string) {
    // this.liveChatService.getMessagesByKey(key).valueChanges().subscribe(x => console.log(x));
  }

  sendMessage(msg: string) {
    this.liveChatService.addLiveChatMessage(this.currentLiveChatKey, msg, true);
  }

  flipSwitch() {
    this.liveChatService.flipLiveChatSwitch(this.liveChatSwitch);
  }

}
