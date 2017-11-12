export class Resource {

    constructor(
        public key: string,
        public title: string,
        public category: string,
        public url: string,
        public isActive: boolean = true,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {}
}
