import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileListViewswitchComponent } from './tile-list-viewswitch.component';

describe('TileListViewswitchComponent', () => {
  let component: TileListViewswitchComponent;
  let fixture: ComponentFixture<TileListViewswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileListViewswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileListViewswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
