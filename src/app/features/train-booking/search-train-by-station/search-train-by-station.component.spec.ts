import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrainByStationComponent } from './search-train-by-station.component';

describe('SearchTrainByStationComponent', () => {
  let component: SearchTrainByStationComponent;
  let fixture: ComponentFixture<SearchTrainByStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTrainByStationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTrainByStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
