import { Note } from './_index';

export class Task {
  
      constructor(
          public key: string,
          public notes: Array<Note>,
          public isActive: boolean = true,
          public createdAt: Date = new Date(),
          public updatedAt: Date = new Date()
      ) {}
  }
  