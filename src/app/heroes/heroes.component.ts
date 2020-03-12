import { Component, OnInit } from '@angular/core';

import { Hero } from "../../assets/utils/hero"

import { HeroService } from '../hero.service'
import { MessageService } from "../message.service"

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe( heroes => this.heroes = heroes)
  }

  onSelect(hero) {
    this.selectedHero = hero
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`)
  }

}
