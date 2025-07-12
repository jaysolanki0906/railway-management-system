import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplyComponent } from './display.component';

describe('DisplyComponent', () => {
  let component: DisplyComponent;
  let fixture: ComponentFixture<DisplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
