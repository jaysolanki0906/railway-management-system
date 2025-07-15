import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, NgMultiSelectDropDownModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  providers: [DatePipe]
})
export class BookingFormComponent implements OnInit {
  form!: FormGroup;
  sendPayment: any;
  quota: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any[] = [];
  list: any[] = [];

  constructor(
    private userget: UserService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<BookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      train_class: ['', Validators.required],
      train_quota: ['', Validators.required],
      source_station: [{ value: '', disabled: true }],
      destination_station: [{ value: '', disabled: true }],
      journey_date: [{ value: '', disabled: true }],
      passenger_list: [[], Validators.required],
      fair: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
  this.list = this.data.train.avlClasses;
  this.fetchUsers();
  this.fetchDetails();
  console.log(this.data);

  this.dropdownSettings = {
    singleSelection: false,
    idField: 'user_id',
    textField: 'first_name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  if (Object.keys(this.data?.train?.availabilityCacheTatkal || {}).length > 0 ) {
    this.quota = ["General", "Tatkal"];
  } else {
    this.quota = ["General"];
  }

  this.form.get('train_quota')?.valueChanges.subscribe((selectedQuota) => {
    if (selectedQuota === 'Tatkal') {
      this.list = Object.keys(this.data.train.availabilityCacheTatkal || {});
    } else {
      this.list = this.data.train.avlClasses;
    }
    console.log("Classes list updated:", this.list);
  });
}


  fetchDetails() {
    console.log(
      'Patching form with:',
      this.data.train.fromStnName,
      this.data.train.toStnName,
      this.data.date
    );
    this.form.patchValue({
      source_station: this.data.train.fromStnName,
      destination_station: this.data.train.toStnName,
      journey_date: this.data.date,
    });
  }

  fetchUsers() {
    this.userget.getusers().subscribe({
      next: (res: any) => {
        this.dropdownList = res.map((u: any) => ({
          user_id: u.id,
          first_name: u.first_name,
        }));
      },
    });
  }

  onTouched() {
    this.form.get('passenger_list')?.markAsTouched();
  }

  onSubmit() {
    this.form.markAllAsTouched();

    const dateObj = this.data.date;
    const date = new Date(dateObj);
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy') || "";

    const t_class = this.form.value.train_class;
    const cache = this.data.train.availabilityCache;
    const selectedClass = cache[t_class];
    const passengerIds = this.form.value.passenger_list.map((p: any) => p.user_id);

    const payload = {
      train_id: this.data.id,
      train_class: this.form.value.train_class,
      source_station: selectedClass.source,
      destination_station: selectedClass.destination,
      journey_date: formattedDate,
      passenger_list: passengerIds,
    };

    console.log("passenger list", this.form.value.passenger_list);
    console.log('payload', payload);

    this.userget.booking(payload).subscribe({
      next: (res) => {
        this.bookTickit(res, passengerIds);
        this.dialogRef.close();
      },
      error: (err) => {
        alert("Sorry! you got some error");
        console.log("err", err);
        this.dialogRef.close();
      }
    });
  }

  setFair() {
    const t_class = this.form.value.train_class;
    let cache;
    if(this.form.value.train_class=='General'){
    cache = this.data.train.availabilityCache;}
    else{
      cache=this.data.train.availabilityCacheTatkal;
    }
    const selectedClass = cache[t_class];
    console.log('Selected class:', selectedClass);
    if (selectedClass) {
      this.form.patchValue({
        fair: selectedClass.fare,
      });
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  bookTickit(ticket: any, plist: any) {
    this.dialog.open(PaymentComponent, {
      width: '600px',
      height: '600px',
      data: {
        ticket: ticket,
        date: this.form.value.date,
        plist: plist
      }
    });
  }

  
}
