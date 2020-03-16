import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service'
import { Observable } from 'rxjs';
import { Hero } from 'src/assets/utils/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  time = new Observable<string>( observer => {
    setInterval( () => {
      observer.next(new Date().toString())
    }, 1000 )
  })

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log("onInit")
    this.getHero()
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.heroService.getHero(id)
      .subscribe( hero => this.hero = hero)
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe( () => this.goBack() )
  }

  goBack() {
    
  }

}
