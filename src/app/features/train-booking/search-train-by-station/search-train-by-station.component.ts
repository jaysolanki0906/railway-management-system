import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  imports: [NgSelectModule, CommonModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './search-train-by-station.component.html',
  styleUrl: './search-train-by-station.component.scss',
  providers: [DatePipe]
})
export class SearchTrainByStationComponent implements OnInit {
  searchForm!: FormGroup;
  cities: any[] = [];
  dropdownSettings: any = {};
  errormsg: string = '';
  disparr: any[] = [];
  todayDate: string = '';
  private datePipe = inject(DatePipe);

  constructor(
    private fb: FormBuilder,
    private train: StationNameService,
    private dialog: MatDialog,
    private traindetail: TrainDetailsService,
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
      date: [null, Validators.required]
    });

    const obj = this.train.getAllStations();
    if (obj && obj.data) {
      this.cities = obj.data;
    } 

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  searchTrain() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const formValue = this.searchForm.value;
    const formattedDate = this.datePipe.transform(new Date(formValue.date), 'dd-MM-yyyy') || "";

    console.log('Formatted date:', formattedDate);
    console.log(this.searchForm.value)

    this.traindetail.fetchTrain(formValue.from[0].code, formValue.to[0].code, formattedDate).subscribe({
      next: (res: any) => {
        if (res?.data?.trainList?.length > 0) {
          this.disparr = res.data.trainList;
          this.errormsg = '';
        } else {
          this.disparr = [];
          this.errormsg = res?.data?.errorMessage || 'No trains found.';
        }
      },
      error: () => {
        console.log("you got some error");
      }
    });
  }

  bookTickit(tickit: any) {
    console.log("Booking:", tickit);
    this.dialog.open(BookingFormComponent, {
      width: '600px',
      data: { id: tickit.trainNumber, train: tickit, date: this.searchForm.value.date }
    });
  }

  get f() {
    return this.searchForm.controls;
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
