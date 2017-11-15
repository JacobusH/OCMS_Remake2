import { LiveChatMessage } from 'app/models/liveChatMessage.model';

export class LiveChat {

      constructor(
        public key:string = '',
        public name: string = '',
        public email: string ='',
        public createdDate: Date = new Date(),
        public isActive: boolean = true,
        public archived: boolean = false,
        public messages: Array<LiveChatMessage> = []
      ) {}
  }
  