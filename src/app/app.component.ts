import { AdService } from './ad.service';
import { AdItem } from './ad-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  ads: AdItem[];
  constructor(
    private adService: AdService
  ){}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}
