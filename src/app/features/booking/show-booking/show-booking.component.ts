import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StationNameService } from '../../../core/services/station-name.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-show-booking',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    FormsModule,
  ],
  templateUrl: './show-booking.component.html',
  styleUrl: './show-booking.component.scss',
})
export class ShowBookingComponent implements OnInit {
  from!: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(
    private stat: StationNameService,
    public fb: FormBuilder,
    private booking: BookingService,
    public dialogRef: MatDialogRef<ShowBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.from = this.fb.group({
      trainId: [{ value: '', disabled: true }],
      class: [{ value: '', disabled: true }],
      sourceStation: [{ value: '', disabled: true }],
      destinationStation: [{ value: '', disabled: true }],
      journyDate: [{ value: '', disabled: true }],
      amount: [{ value: '', disabled: true }],
      pnr: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      selectedItems: [[]],
    });
    console.log('this is data', data);
  }
  ngOnInit(): void {
    console.log('this is in on init');
    this.setValue();
    console.log('this is from value', this.from.value);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  setValue() {
    this.booking.fetchOneBooking(this.data.tickit.id).subscribe({
      next: (res: any) => {
        const passengers = res[0].booking_details.map((detail: any) => ({
          id: detail.profile_id,
          name: detail.profile.first_name,
        }));

        this.from.patchValue({
          trainId: res[0].train_id,
          class: res[0].train_class,
          sourceStation: this.stat.getCodeByName(res[0].source_station),
          destinationStation: this.stat.getCodeByName(
            res[0].destination_station
          ),
          journyDate: res[0].journey_date,
          amount: res[0].amount,
          pnr: res[0].pnr,
          status: res[0].status,
          selectedItems: passengers,
        });

        this.dropdownList = passengers;
        console.log('Dropdown list populated:', this.dropdownList);
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.dropdownList = this.from.value.selectedItems;
    console.log('this is slected item', this.from.value.selectedItems);
  }
  delete() {
    const paylod = {
      bookingDetailIds: this.from.value.selectedItems.map(
        (item: any) => item.id
      ),
    };
    console.log(paylod);
    this.booking.deleteBooking(this.data.tickit.id, paylod).subscribe({
      next: () => {
        alert('congo! functionality works');
      },
    });
  }
}
