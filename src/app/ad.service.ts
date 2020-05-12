import { AdItem } from './ad-item';
import { HeroProfileComponent } from './hero-prorfile.component';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  getAds() {
    return [
      new AdItem(HeroProfileComponent, {
        name: 'Bombasto', bio: 'Brave as they come'
      }),
      new AdItem(HeroProfileComponent, {
        name: 'Dr IQ', bio: 'Smart as they come'
      }),
      new AdItem(HeroProfileComponent, {
        name: 'Windstorm', bio: 'control wind for power'
      }),
      new AdItem(HeroJobAdComponent, {
        headline: 'Hiring for several positions', body: 'control wind for power'
      }),
      new AdItem(HeroJobAdComponent, {
        headline: 'Opening in all departments', body: 'Apply today'
      }),
    ]
  }
}
