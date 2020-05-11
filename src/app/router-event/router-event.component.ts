import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-router-event',
  templateUrl: './router-event.component.html',
  styleUrls: ['./router-event.component.less']
})
export class RouterEventComponent implements OnInit {
  navStart: Observable<NavigationStart>;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.navStart = route.events.pipe(
      filter( evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>
  }

  ngOnInit(): void {
    this.navStart.subscribe(
      evt => console.log("Navigation Start:: ")
    )
    this.activatedRoute.url
      .subscribe( url => console.log('The URL changed to :', url) )
  }

}
