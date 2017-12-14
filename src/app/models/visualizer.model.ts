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

export interface Visualizer {
  key: string,
  nodes: Array<GraphNode>,
  links: Array<GraphLink>,
  options: VisualizerOptions,
  isActive: boolean,
  createdAt: Date,
  updatedAt?: Date
}

export interface VisualizerOptions {
  orientation: string, // TB, LR...
  view: [number, number], // width, height
  autoZoom: boolean,
  legend: boolean, // show legend t/f
  scheme: string, // picnic etc. from color-sets.ts
  curve: string //shape.curveLinear etc. from d3-shape 
}