import { Component } from "@angular/core";

import { products } from "../products"

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.less"]
})
export class ProductListComponent {
  products = products

  share() {
    window.alert("The product has been shared!")
  }

  onNotify() {
    console.log("hello world::: ")
    window.alert("You will be notified when the product goes on Sale")
  }

}