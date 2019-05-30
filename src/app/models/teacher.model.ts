// export class Teacher { 
  
//         constructor(
//           public key:string = '',
//           public name:string = '',
//           public descriptionHTML: string = '',
//           public qualifications: string = '',
//           public instrument: string = '',
//           public itemUrl: string = '',
//           public isActive: boolean = true,
//           public createdAt: Date = new Date(),
//           public updatedAt: Date = new Date()
//         ) {}
//     }

export interface Teacher {
  key: string,
  name: string,
  summary: string ,
  qualifications: string,
  instrument: string,
  imgUrl: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
