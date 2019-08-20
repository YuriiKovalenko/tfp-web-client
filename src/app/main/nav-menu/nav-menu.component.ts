import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  public items: NbMenuItem[];

  constructor() {
    this.items = [
      {
        title: 'Профиль',
        link: '/main/profile',
        icon: 'user',
        pathMatch: 'prefix'
      },
      {
        title: 'Встречи',
        link: '/main/meets',
        icon: 'location',
        pathMatch: 'prefix'
      },
      {
        title: 'Поиск',
        link: '/main/search',
        icon: 'magnifier',
        pathMatch: 'prefix'
      },
      {
        title: 'Настройки',
        link: '/main/settings',
        icon: 'cog',
        pathMatch: 'prefix'
      }
    ];
  }

  ngOnInit() {}
}
