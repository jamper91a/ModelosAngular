import {loadStripe} from '@stripe/stripe-js';
import {environment} from '../../environments/environment';


export class StripeService{
  private stripe = null;

  constructor() {
    loadStripe(environment.stripe.publicKey).then(function(stripe){
      this.stripe = stripe
    });
  }
}
