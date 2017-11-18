import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoerComponent } from './todoer.component';

describe('TodoerComponent', () => {
  let component: TodoerComponent;
  let fixture: ComponentFixture<TodoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
