import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFromComponent } from './password-from.component';

describe('PasswordFromComponent', () => {
  let component: PasswordFromComponent;
  let fixture: ComponentFixture<PasswordFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
