import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomneComponent } from './homne.component';

describe('HomneComponent', () => {
  let component: HomneComponent;
  let fixture: ComponentFixture<HomneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
