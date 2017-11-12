export class Signup {
  
      constructor(
        public key:string = '',
        public name: string = '',
        public email: string = '',
        public about: string = '',
        public instrument: string = '',
        public read: boolean = false,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
      ) {}
  }
  