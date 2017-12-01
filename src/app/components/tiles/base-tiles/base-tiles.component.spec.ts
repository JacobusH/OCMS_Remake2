import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTilesComponent } from './base-tiles.component';

describe('BaseTilesComponent', () => {
  let component: BaseTilesComponent;
  let fixture: ComponentFixture<BaseTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
