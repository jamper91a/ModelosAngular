import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {loadStripe} from '@stripe/stripe-js';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  constructor() {

  }

  async ngOnInit() {
    const stripe = await loadStripe(environment.stripe.publicKey);
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
  }


  onAddCreditCard(ev) {
    ev.preventDefault();

  }
}
