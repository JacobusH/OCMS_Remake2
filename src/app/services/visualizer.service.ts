import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Visualizer, GraphNode, GraphLink } from 'app/models/_index';
import 'rxjs/add/operator/switchMap' 
import * as firebase from 'firebase/app';

@Injectable()
export class VisualizerService {
  graphs: AngularFirestoreCollection<Visualizer>;
  
  constructor(private afs: AngularFirestore) { 
    this.graphs = this.afs.collection('graphs');
  }

  createNew(): Visualizer {
    let data: Visualizer = {
      key: '',
      nodes: new Array,
      links: new Array,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  createNewNode(): GraphNode {
    let data: GraphNode = {
      key: '',
      id: '',
      label: '',
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
