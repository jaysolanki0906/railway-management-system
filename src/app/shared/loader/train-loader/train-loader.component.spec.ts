import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainLoaderComponent } from './train-loader.component';

describe('TrainLoaderComponent', () => {
  let component: TrainLoaderComponent;
  let fixture: ComponentFixture<TrainLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
