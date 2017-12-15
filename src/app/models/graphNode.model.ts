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

export interface GraphNode {
  key?: string,
  id?: string,
  label?: string,
  youtubeLink?: string,
  isActive?: boolean,
  createdAt?: Date,
  updatedAt?: Date
}
