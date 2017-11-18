import{ Note, Task } from './_index';

export class Project {
  
      constructor(
          public key: string,
          public tasks: Array<Task>,
          public notes: Array<Note>,
          public isActive: boolean = true,
          public createdAt: Date = new Date(),
          public updatedAt: Date = new Date()
      ) {}
  }
  