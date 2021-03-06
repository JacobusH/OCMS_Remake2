// export class FAQ {

//     constructor(
//         public key: string,
//         public question: string,
//         public answer: string,
//         public isActive: boolean = true,
//         public createdAt: Date = new Date(),
//         public updatedAt: Date = new Date()
//     ) {}
// }

export interface FAQ {
    key: string,
    question: string,
    answer: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
  }

export interface FAQForm {
  question: {required: true, controlType: 'textarea'};
  answer: {required: true, controlType: 'textarea'};
  isActive: {required: true, controlType: 'checkbox'};
}
