import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendoerEventModalComponent } from './calendoer-event-modal.component';

describe('CalendoerEventModalComponent', () => {
  let component: CalendoerEventModalComponent;
  let fixture: ComponentFixture<CalendoerEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendoerEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendoerEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
