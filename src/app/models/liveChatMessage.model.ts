// export class LiveChatMessage {
  
//         constructor(
//           public message: string = '',
//           public dateTime: string ='',
//           public invertedDate: number = -1,
//           public fromAdmin: boolean = false,
//           public read: boolean = false,
//           public createdAt: Date = new Date(),
//           public updatedAt: Date = new Date()
//         ) {}
//     }

export interface LiveChatMessage {
  key: string,
  message: string,
  fromAdmin: boolean,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
    