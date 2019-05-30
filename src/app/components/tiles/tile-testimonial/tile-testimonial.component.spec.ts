import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileTestimonialComponent } from './tile-testimonial.component';

describe('TileTestimonialComponent', () => {
  let component: TileTestimonialComponent;
  let fixture: ComponentFixture<TileTestimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileTestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
