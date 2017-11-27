import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpsComponent } from './sign-ups.component';

describe('SignUpsComponent', () => {
  let component: SignUpsComponent;
  let fixture: ComponentFixture<SignUpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
