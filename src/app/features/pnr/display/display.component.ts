import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TrainPnr } from '../../../core/model/trainmodel';
import { TrainDetailsService } from '../../../core/services/train-details.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display',
  imports: [CommonModule,FormsModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent {
  display:boolean=false;
  noData: boolean = false;
  myInputValue: number=0;
  objectPnr!: TrainPnr;
  constructor(private train:TrainDetailsService){}
  fetchPnr() {
  this.train.trainpnr(this.myInputValue).subscribe({
    next: (res: any) => {
      if (res && res.booking_details && res.booking_details.length > 0) {
        this.objectPnr = res;
        this.display = true;
        this.noData = false;
      } else {
        this.display = false;
        this.noData = true;
      }
    },
    error: (err) => {
      console.log('Error:', err);
      this.display = false;
      this.noData = true;
    }
  });
}
}
