import { AdComponent } from './ad.component';
import { Input, Component } from '@angular/core';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{ data.headline }}</h4>

      {{ data.body }}
    </div>
  `
})
export class HeroJobAdComponent implements AdComponent {
  @Input() data: any;
}
