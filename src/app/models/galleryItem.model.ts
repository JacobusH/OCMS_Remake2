export class GalleryItem { 

      constructor(
        public key:string = '',
        public caption: string = '',
        public categories: string = '',
        public itemUrl: string = '',
        public isActive: boolean = true,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
      ) {}
  }
  