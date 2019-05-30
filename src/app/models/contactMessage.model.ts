// export class ContactMessage {

//     constructor(
//       public key:string = '',
//       public name: string = '',
//       public email: string = '',
//       public phone: string = '',
//       public message: string = '',
//       public dateTime: string = '',
//       public dateUnix: string = '',
//       public read: boolean = true,
//       public createdAt: Date = new Date(),
//       public updatedAt: Date = new Date(),
//     ) {}
// }

export interface ContactMessage {
  key: string,
  name: string,
  email: string,
  phone: string,
  message: string,
  isActive: boolean,
  read: boolean,
  createdAt: Date,
  updatedAt: Date
}
