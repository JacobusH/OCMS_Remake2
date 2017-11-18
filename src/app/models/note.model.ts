export class Note {
  
      constructor(
          public key: string,
          public freeText: string,
          public listItems: Array<string>,
          public createdAt: Date = new Date(),
          public updatedAt: Date = new Date()
      ) {}
  }
  