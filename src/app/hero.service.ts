import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

import { MessageService } from './message.service'

import { Hero } from "../assets/utils/hero"
import { HEROES } from '../assets/utils/mock-heros'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes")
    return of(HEROES);
  }
}
