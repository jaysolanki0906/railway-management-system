import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from 'ngx-stripe';
import { StripeElements, StripeCardElement, StripeElementsOptions } from '@stripe/stripe-js';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../../core/services/payment.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  imports: [CommonModule]
})
export class PaymentComponent implements OnInit {
  elements!: StripeElements;
  card!: StripeCardElement;
  isProcessing = false;
  errorMessage = '';
  paymentResult: any = null;

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  // Your client secret will come from the data
  clientSecret!: string;

  constructor(
    private payment:PaymentService,
    private stripeService: StripeService,
    private route:Router,
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('DATA:', data);
    this.clientSecret = data?.ticket?.payment_data?.client_secret ?? '';
    console.log('Client Secret:', this.clientSecret);
    this.stripeService.setKey('pk_test_51RYk81QqKm2Ipe2h1ZinDd7VEtaZD5xwzheiCqeSuwueTzhNdIL9xyKjIV6XPDG5uIP2TuGZb2UN7SjHBmsyYU5300YGZBwhjy');
  }

  ngOnInit() {
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        this.card = this.elements.create('card');
        this.card.mount('#card-element');
      });
  }

  pay() {
    this.isProcessing = true;
    this.errorMessage = '';
    this.paymentResult = null;

    this.stripeService.confirmCardPayment(
      this.clientSecret,
      {
        payment_method: {
          card: this.card
        }
      }
    ).subscribe(result => {
      this.isProcessing = false;
      if (result.error) {
        this.errorMessage = result.error.message ?? 'Unknown error';
        console.error('Payment error:', result.error);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', result.paymentIntent);
        this.paymentResult = result.paymentIntent;
        console.log(result);
        const payload={
          payment_intent_id:result.paymentIntent.id,
          passenger_list:this.data.plist,
        } 
        this.payment.paymentConfirm(payload).subscribe({
          next:()=>
          {
            this.route.navigate(['booking']);
            this.dialogRef.close();
          },
          error:(err)=>{
            console.log("this is error",err);
          }
        })
      }
    });
  }
}
