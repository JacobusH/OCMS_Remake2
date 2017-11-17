import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeComponent, TreeNode } from 'angular-tree-component';
import { MenuItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
  selector: 'app-todoer',
  templateUrl: './todoer.component.html',
  styleUrls: ['./todoer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoerComponent implements OnInit {
  @ViewChild('todoer')
  private tree: TreeComponent;
  modalDisplay: boolean = false;
  
  // Menu Items

  // Nodes / content
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  // Options
  // options: ITreeOptions = {
  //   displayField: 'name',
  //   isExpandedField: 'expanded',
  //   idField: 'uuid',
  //   actionMapping: {
  //     mouse: {
  //       dblClick: (tree, node, $event) => {
  //         if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
  //       }
  //     }
  //   },
  //   nodeHeight: 23,
  //   allowDrag: (node) => {
  //     return true;
  //   },
  //   allowDrop: (node) => {
  //     return true;
  //   },
  //   useVirtualScroll: true,
  //   animateExpand: true,
  //   animateSpeed: 30,
  //   animateAcceleration: 1.2
  // }


  constructor() { }

  ngOnInit() {
 
    }

  // addNode(event, node: TreeNode) {
  //   // this.nodes.push({ id: 1, name: 'another node', children: [] });

  //   if(!node.hasChildren) {
  //     node.children = new Array;
  //   }
  //   // new TreeNode({ id: 1, name: 'another node', children: [] }, node, this.tree.treeModel, 0);
  //   // this.tree.treeModel.update();
    
  //   // node.children.push(new TreeNode('data', node, this.tree.treeModel, 0))
  //   // this.tree.treeModel.update();

  //   this.nodes.forEach(element => {
  //     console.log(element);
  //     if(element.id == node.id) {
  //       if(!element.children) {
  //         element.children = [];
  //       }
  //       // element.children.push({ id: 1, name: 'another node', children: [] });
  //     }
  //   });
  //   this.tree.treeModel.update();
    
  // }

  addSibling(event, node: TreeNode) {
    let parentNode = node.realParent
    ? node.realParent
    : node.treeModel.virtualRoot;

    parentNode.data.children.push({
      id: 10,
      name: 'newNode',
      children: []
    });
    this.tree.treeModel.update();
  }

  addChild(event, node: TreeNode) {
    if(!node.data.children) {
      node.data.children = []
    }

    node.data.children.push({
      id: 10,
      name: 'newNode',
      children: []
    });
    this.tree.treeModel.update();
  }

  removeNode(event, node: TreeNode) {
    let parentNode = node.realParent
    ? node.realParent
    : node.treeModel.virtualRoot;

    _.remove(node.parent.data.children, node.data);
    this.tree.treeModel.update();
  }

  showDialog() {
    this.modalDisplay = true;
}

}
