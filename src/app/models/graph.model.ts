import { GraphLink, GraphNode } from './_index';

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

export interface Graph {
  key: string,
  nodes: Array<GraphNode>,
  links: Array<GraphLink>,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
