import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TrainDetailsService } from '../../../core/services/train-details.service';
import { StationNameService } from '../../../core/services/station-name.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-search-train-by-station',
  standalone: true,
  imports: [
    NgSelectModule,
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
  ],
  templateUrl: './search-train-by-station.component.html',
  styleUrl: './search-train-by-station.component.scss',
  providers: [DatePipe],
})
export class SearchTrainByStationComponent implements OnInit {
  searchForm!: FormGroup;
  cities: any[] = [];
  tocities: any[] = [];
  dropdownSettings: any = {};
  errormsg: string = '';
  disparr: any[] = [];
  todayDate: string = '';
  private datePipe = inject(DatePipe);

  constructor(
    private fb: FormBuilder,
    private train: StationNameService,
    private dialog: MatDialog,
    private traindetail: TrainDetailsService
  ) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.todayDate = `${yyyy}-${mm}-${dd}`;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      date: [null, Validators.required],
    });

    const obj = this.train.getAllStations();
    if (obj && obj.data) {
      this.cities = obj.data;
    }

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'code',
      textField: 'name',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  updateValueInTo() {
    const selectedFrom = this.searchForm.value.from?.[0]?.code;
    this.tocities = this.cities.filter(
      (station) => station.code !== selectedFrom
    );
  }

  searchTrain() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const formValue = this.searchForm.value;
    const formattedDate =
      this.datePipe.transform(new Date(formValue.date), 'dd-MM-yyyy') || '';

    console.log('Formatted date:', formattedDate);
    console.log(this.searchForm.value);

    this.traindetail
      .fetchTrain(formValue.from[0].code, formValue.to[0].code, formattedDate)
      .subscribe({
        next: (res: any) => {
          if (res?.data?.trainList?.length > 0) {
            this.disparr = res.data.trainList
              .filter((train: any) => {
                // Use availabilityDisplayName for filtering
                const cacheDetails = [
                  ...Object.values(train.availabilityCache || {}),
                  ...Object.values(train.availabilityCacheTatkal || {}),
                ];
                return cacheDetails.some(
                  (details: any) =>
                    details &&
                    typeof details.availabilityDisplayName === 'string' &&
                    details.availabilityDisplayName !== 'Regret' &&
                    details.availabilityDisplayName !== 'Not Available'
                );
              })
              .map((train: any) => {
                return {
                  ...train,
                  availabilityCache: Object.fromEntries(
                    Object.entries(train.availabilityCache || {}).filter(
                      ([coach, details]) =>
                        details &&
                        typeof (details as any).availabilityDisplayName ===
                          'string' &&
                        (details as any).availabilityDisplayName !== 'Regret' &&
                        (details as any).availabilityDisplayName !==
                          'Not Available' &&
                        (details as any).fare !== 0 &&
                        (details as any).fare !== '0'
                    )
                  ),
                  availabilityCacheTatkal: Object.fromEntries(
                    Object.entries(train.availabilityCacheTatkal || {}).filter(
                      ([coach, details]) =>
                        details &&
                        typeof (details as any).availabilityDisplayName ===
                          'string' &&
                        (details as any).availabilityDisplayName !== 'Regret' &&
                        (details as any).availabilityDisplayName !==
                          'Not Available' &&
                        (details as any).fare !== 0 &&
                        (details as any).fare !== '0'
                    )
                  ),
                };
              });

            console.log('Filtered Trains:', this.disparr);

            if (this.disparr.length === 0) {
              this.errormsg = 'No trains with available classes.';
            } else {
              this.errormsg = '';
            }
          } else {
            this.disparr = [];
            this.errormsg = res?.data?.errorMessage || 'No trains found.';
          }
        },
        error: (err) => {
          this.disparr = [];
          this.errormsg = 'Error fetching trains.';
          console.error(err);
        },
      });
  }

  bookTickit(tickit: any) {
    console.log('Booking:', tickit);
    this.dialog.open(BookingFormComponent, {
      width: '600px',
      data: {
        id: tickit.trainNumber,
        train: tickit,
        date: this.searchForm.value.date,
      },
    });
  }

  onSelectAll(items: any) {
    console.log(items);
  }
}
