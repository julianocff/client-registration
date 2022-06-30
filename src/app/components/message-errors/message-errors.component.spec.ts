import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageErrorsComponent } from './message-errors.component';

describe('MessageErrorsComponent', () => {
  let component: MessageErrorsComponent;
  let fixture: ComponentFixture<MessageErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
