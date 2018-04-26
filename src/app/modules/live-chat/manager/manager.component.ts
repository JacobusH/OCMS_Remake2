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
  liveChatsByDate;
  liveChatSwitch;
  currentLiveChat;
  currentLiveChatKey;
  currentLiveChatMessages;
  tileOrList = 'tile';

  constructor(private liveChatService: LiveChatService) { 
    this.liveChatsByDate = this.liveChatService.liveChatsByDate.valueChanges();
    this.liveChatService.switchy.valueChanges().subscribe(x => {
      this.liveChatSwitch = x.isActive;
    });
  }

  ngOnInit() {
  }

  selectedView(sel: string) {
    this.tileOrList = sel;
  }

  setCurrentLiveChat(key: string) {
    this.currentLiveChatKey = key;
    this.currentLiveChat = this.liveChatService.getLiveChatByKey(key).valueChanges();
    this.currentLiveChatMessages = this.liveChatService.liveChats.doc(key).collection('messages', ref => 
    ref.orderBy('createdAt', 'asc')).valueChanges();
  }

  markNoNewMessages() {
    this.liveChatService.markLiveChatUnreadMessage(this.currentLiveChatKey, false);
  }

  getFirstMessage(key: string): string {
    // this.liveChatService.getMessagesByKey(key).snapshotChanges().subscribe(x => {
    //   console.log(x);
    // });

    // this.liveChatService.liveChats.doc(key).collection('messages', ref => 
    // ref.orderBy('createdAt', 'asc')).valueChanges().take(1).subscribe(x => console.log(x))

    return "";
  }

  sendMessage(msg: string) {
    this.liveChatService.addLiveChatMessage(this.currentLiveChatKey, msg, true);
  }

  flipSwitch() {
    this.liveChatService.flipLiveChatSwitch(this.liveChatSwitch);
  }

  deleteLivechat() {
    this.liveChatService.deleteByKey(this.currentLiveChatKey);
  }

}
