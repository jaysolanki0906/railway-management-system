import { Component } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-train-loader',
  imports: [CommonModule],
  templateUrl: './train-loader.component.html',
  styleUrl: './train-loader.component.scss'
})
export class TrainLoaderComponent {
  constructor(public loader: LoaderService) {}
}
