

export class User {

    constructor(
      public authID: string = '',
      public key: string = '',
      public name: string = '',
      public authDisplayName: string = '',
      public authPhotoUrl: string = '',
      public email: string = '',
      public password: string = '',
      public role: string = '',
      public authMethod: string = ''
    ) {}
}