import { Component, OnInit, HostBinding } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-host-binding',
  template: `<input [(ngModel)]="prop">`,
  styleUrls: ['./host-binding.component.less']
})
export class HostBindingComponent implements OnInit {
  prop;

  constructor(public control: NgModel) {}
  @HostBinding('class.valid') get valid() { return this.control.valid; }
  @HostBinding('class.invalid') get invalid() { return this.control.invalid; }

  ngOnInit(): void {
  }

}
