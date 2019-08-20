import { Component } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'tfp';
  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('linear', {
      iconClassPrefix: 'lnr',
      packClass: 'lnr'
    });
    this.iconLibraries.setDefaultPack('linear');
  }
}
