import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service'
import { Observable } from 'rxjs';
import { Hero } from 'src/assets/utils/hero';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  show = false;
  path:SafeResourceUrl;
  token = "";
  time = new Observable<string>( observer => {
    setInterval( () => {
      observer.next(new Date().toString())
    }, 1000 )
  })

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log("onInit")
    this.getHero()
    this.token = "hello this is my token";
    this.path = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.baidu.com/");

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
