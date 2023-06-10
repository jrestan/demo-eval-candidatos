import { Component } from '@angular/core';

// import {IconSetService} from "@coreui/icons-angular";
// import {brandSet, flagSet, freeSet} from '@coreui/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authApp';

  constructor(
    //public iconSet: IconSetService
  ) {
    //iconSet.icons = {...brandSet, ...flagSet, ...freeSet};
  }
}
