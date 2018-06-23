import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorSingleComponent } from './selector-single.component';

describe('SelectorSingleComponent', () => {
  let component: SelectorSingleComponent;
  let fixture: ComponentFixture<SelectorSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
