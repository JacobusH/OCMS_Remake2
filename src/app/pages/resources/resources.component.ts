import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'app/services/_index';
import { Resource } from 'app/models/_index';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources: any;

  constructor(private resourceService: ResourceService) { 
    this.resources = resourceService.resources.valueChanges();
  }

  ngOnInit() {
  }

}
