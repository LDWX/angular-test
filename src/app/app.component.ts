import { Component } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Tour of Heroes';
  myHero = "Windstorm";
  heros = [
    new Hero(1, "WindowStomr"),
    new Hero(13, "Bombasto"),
    new Hero(15, "Magneta"),
    new Hero(20, "Tornado"),
  ]
}
