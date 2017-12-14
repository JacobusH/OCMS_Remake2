// export class FAQ {

//     constructor(
//         public key: string,
//         public question: string,
//         public answer: string,
//         public isActive: boolean = true,
//         public createdAt: Date = new Date(),
//         public updatedAt: Date = new Date()
//     ) {}
// }

export interface GraphLink {
  key?: string,
  source?: string,
  target?: string,
  label?: string,
  isActive?: boolean,
  createdAt?: Date,
  updatedAt?: Date
}
