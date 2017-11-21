// export class Note {
  
//       constructor(
//           public key: string,
//           public freeText: string,
//           public listItems: Array<string>,
//           public createdAt: Date = new Date(),
//           public updatedAt: Date = new Date()
//       ) {}
//   }


export interface Note {
  key: string,
  name: string,
  freeText: string,
  listItems: Array<string>,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}