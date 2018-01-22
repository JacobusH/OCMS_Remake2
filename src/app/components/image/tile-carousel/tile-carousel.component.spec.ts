import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileCarouselComponent } from './tile-carousel.component';

describe('TileCarouselComponent', () => {
  let component: TileCarouselComponent;
  let fixture: ComponentFixture<TileCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
