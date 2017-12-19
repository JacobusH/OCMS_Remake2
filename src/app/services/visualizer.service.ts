import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Visualizer, GraphNode, GraphLink, VisualizerOptions } from 'app/models/_index';
import 'rxjs/add/operator/switchMap' 
import * as firebase from 'firebase/app';
import * as shape from 'd3-shape';

@Injectable()
export class VisualizerService {
  graphs: AngularFirestoreCollection<Visualizer>;
  
  constructor(private afs: AngularFirestore) { 
    this.graphs = this.afs.collection('visualizers');
  }

  createNew(): Visualizer {
    let data: Visualizer = {
      key: '',
      nodes: new Array,
      links: new Array,
      options: this.createNewVisualizerOptions(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  createNewVisualizerOptions(): VisualizerOptions {
    let data: VisualizerOptions = {
      orientation: 'TB', // TB, LR...
      view: null, // width, height, undefined give autofit to container
      autoZoom: false,
      legend: true, // show legend t/f
      scheme: 'picnic', // picnic etc. from color-sets.ts
      // curve: shape.curveLinear //shape.curveLinear etc. from d3-shape 
      curve: null //shape.curveLinear etc. from d3-shape 
      };
      return data;
  }

  createNewNode(): GraphNode {
    let data: GraphNode = {
      key: '',
      id: '',
      label: '',
      youtubeLink: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  createNewLink(): GraphLink {
    let data: GraphLink = {
      key: '',
      source: '',
      target: '',
      label: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }


  save(t: Visualizer): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.graphs.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  edit(item: Visualizer): Promise<void> {
    return this.graphs.doc(item.key).update(item);
  }

  delete(item: Visualizer): Promise<void> {
    return this.graphs.doc(item.key).delete();
  }

}
