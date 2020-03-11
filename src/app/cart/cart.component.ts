import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { 
    this.checkoutForm = this. formBuilder.group({
      name: '',
      address: ''
    })

    this.checkoutForm.registerControl("name", )
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems()
  }

  onSubmit(customerData) {
    console.warn('Your order has been submimited', customerData)

    this.items = this.cartService.clearCart()
    this.checkoutForm.reset()
  }

}
