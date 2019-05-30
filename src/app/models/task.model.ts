import { Note } from './_index';

// export class Task {
  
//       constructor(
//           public key: string,
//           public notes: Array<Note>,
//           public isActive: boolean = true,
//           public createdAt: Date = new Date(),
//           public updatedAt: Date = new Date()
//       ) {}
//   }

export interface Task {
  key: string,
  name: string,
  descriptionHtml: string,
  notes: Array<Note>,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}

  