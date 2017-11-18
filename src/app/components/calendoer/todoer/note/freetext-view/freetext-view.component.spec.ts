import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreetextViewComponent } from './freetext-view.component';

describe('FreetextViewComponent', () => {
  let component: FreetextViewComponent;
  let fixture: ComponentFixture<FreetextViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreetextViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreetextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
