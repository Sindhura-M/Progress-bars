import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngProgressBarComponent } from './ang-progress-bar.component';

describe('AngProgressBarComponent', () => {
  let component: AngProgressBarComponent;
  let fixture: ComponentFixture<AngProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
