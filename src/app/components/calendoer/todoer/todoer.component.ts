import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-todoer',
  templateUrl: './todoer.component.html',
  styleUrls: ['./todoer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoerComponent implements OnInit {
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
  options: ITreeOptions = {
    displayField: 'nodeName',
    isExpandedField: 'expanded',
    idField: 'uuid',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      }
    },
    nodeHeight: 23,
    allowDrag: (node) => {
      return true;
    },
    allowDrop: (node) => {
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }

  // actionMapping:IActionMapping = {
  //   keys: {
  //     127: (tree, node, $event) => // do something to delete the node,
  //     [KEYS.ENTER]: TREE_ACTIONS.EXPAND
  //   }
  // }
  constructor() { }

  ngOnInit() {
  }

}
