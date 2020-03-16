import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-router-event',
  templateUrl: './router-event.component.html',
  styleUrls: ['./router-event.component.less']
})
export class RouterEventComponent implements OnInit {
  navStart: Observable<NavigationStart>;

  constructor(
    private route: Router
  ) {
    this.navStart = route.events.pipe(
      filter( evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>
  }

  ngOnInit(): void {
    this.navStart.subscribe(
      evt => console.log("Navigation Start:: ", evt)
    )
  }

}
