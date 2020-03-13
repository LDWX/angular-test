import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

import { Hero } from 'src/assets/utils/hero';
import { HeroService } from '../hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.less']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>
  private searchTerms = new Subject<string>();
    
  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
     
      debounceTime(300),

      distinctUntilChanged(),

      switchMap( (term: string) => this.heroService.searchHeroes(term) )
    )
    console.log("heroes$::: ", this.heroes$)
  }
  
  
  search(term: string): void {
    this.searchTerms.next(term)
  }

}