import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService, NbSidebarService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private mediaQuerySubscription: Subscription;
  public isMobile: boolean;
  public user: User;

  constructor(
    private readonly themeService: NbThemeService,
    private readonly sidebarService: NbSidebarService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.mediaQuerySubscription = this.themeService
      .onMediaQueryChange()
      .pipe(
        delay(10),
        map(change => change[1].name === 'xs' || change[1].name === 'is')
      )
      .subscribe(result => (this.isMobile = result));
  }

  ngOnDestroy() {
    this.mediaQuerySubscription.unsubscribe();
  }

  public toggleSidebar() {
    this.sidebarService.toggle();
  }
}
