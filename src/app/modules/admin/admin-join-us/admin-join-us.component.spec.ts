import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJoinUsComponent } from './admin-join-us.component';

describe('AdminJoinUsComponent', () => {
  let component: AdminJoinUsComponent;
  let fixture: ComponentFixture<AdminJoinUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminJoinUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJoinUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
