export class User {

    constructor(
      public authID: string = '',
      public authMethod: string = '',
      public authDisplayName: string = '',
      public authPhotoUrl: string = '',
      public key: string = '',
      public name: string = '',
      public email: string = '',
      public password: string = '',
      public roles: string = '',
      public isActive: boolean = true,
      public createdAt: Date = new Date(),
      public updatedAt: Date = new Date()
    ) {}
}