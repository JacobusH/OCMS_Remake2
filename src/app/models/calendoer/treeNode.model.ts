// export class TreeNode { 
  
//       constructor(
//         public key:string = '',
//         public name:string = '',
//         public descriptionHTML: string = '',
//         public qualifications: string = '',
//         public instrument: string = '',
//         public itemUrl: string = '',
//         public isActive: boolean = true,
//         public createdAt: Date = new Date(),
//         public updatedAt: Date = new Date()
//       ) {}
//   }

  export interface TreeNode {
    key: string,
    name: string,
    email: string,
    message: string,
    isActive: boolean,
    read: boolean,
    createdAt: Date,
    updatedAt: Date
  }
      