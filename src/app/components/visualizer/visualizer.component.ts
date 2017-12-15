
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { colorSets } from './color-sets';
import chartGroups from './chartTypes';
import { id } from './id';
import { VisualizerService } from 'app/services/visualizer.service';
import { Visualizer, VisualizerOptions } from 'app/models/_index';
import { ContextMenuComponent } from 'ngx-contextmenu';
import * as shape from 'd3-shape';
import * as _ from 'lodash';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
];
// @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;

  version = 1;
  theme = 'dark';
  chartGroups: any;
  visualizer: Visualizer;

  width: number = 700;
  height: number = 300;
  fitContainer: boolean = true;
  autoZoom: boolean = false;
  
  colorSets: any;
  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;

  // options
  showLegend = false;
  orientation: string = 'TB'; // LR, RL, TB, BT
  orientations: any[] = [
    {
      label: 'Left to Right',
      value: 'LR'
    }, {
      label: 'Right to Left',
      value: 'RL'
    }, {
      label: 'Top to Bottom',
      value: 'TB'
    }, {
      label: 'Bottom to Top',
      value: 'BT'
    }
  ];

  // line interpolation
  curveType: string = 'Linear';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
    'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  ];


  constructor(private vService: VisualizerService) {
    Object.assign(this, {
      colorSets,
      chartGroups,
      // visualizer: this.getGraphData(),
    });

    this.visualizer = this.vService.createNew();
    this.visualizer.links = this.getGraphData().links;
    this.visualizer.nodes = this.getGraphData().nodes;
    // this.visualizer.options.view = [this.width, this.height];

    this.setColorScheme('picnic');
    this.setInterpolationType('Bundle');
  }

  ngOnInit() {
    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  /***************
  ** NODES
  ***************/
  showMessage(txt: string) {
    console.log(txt);
  }

  nodeChangeName(ev,item) {
    // console.log(ev.srcElement.value);
    // console.log(item);

    _.find(this.visualizer.nodes, o => {
      if(o.id == item.id) {
        console.log(o);
        o.label = ev.srcElement.value;
        console.log(o);
      }
    })

    this.visualizer.nodes.push({id: '100', label: 'new test'});
    this.visualizer.links.push({source: '1', target: '100', label: 'new test'})

    this.visualizer.links = [...this.visualizer.links];
    this.visualizer.nodes = [...this.visualizer.nodes];


  }

  save() {
    this.vService.save(this.visualizer);
  }

  getGraphData() {
    let nodes = [
      {
        id: 'start',
        label: 'start'
      }, {
        id: '1',
        label: 'Query ThreatConnect',
      }, {
        id: '2',
        label: 'Query XForce',
      }, {
        id: '3',
        label: 'Format Results'
      }, {
        id: '4',
        label: 'Search Splunk'
      }, {
        id: '5',
        label: 'Block LDAP'
      }, {
        id: '6',
        label: 'Email Results'
      }
    ];

    let links = [
      {
        source: 'start',
        target: '1',
        label: 'links to'
      }, {
        source: 'start',
        target: '2'
      }, {
        source: '1',
        target: '3',
        label: 'related to'
      }, {
        source: '2',
        target: '4'
      }, {
        source: '2',
        target: '6'
      }, {
        source: '3',
        target: '5'
      }
    ]

    return {nodes, links};
  }


  applyDimensions() {
    this.visualizer.options.view = [this.width, this.height];
  }

  toggleFitContainer(fitContainer: boolean, autoZoom: boolean): void {
    this.fitContainer = fitContainer;
    this.autoZoom = autoZoom;

    if (this.fitContainer) {
      this.visualizer.options.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  select(data) {
    console.log('Item clicked', data);
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  toggleExpand(node) {
    console.log('toggle expand', node);
  }


}
