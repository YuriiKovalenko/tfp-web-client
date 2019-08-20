import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  public user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

  public getProfileType(code: number) {
    switch (code) {
      case 0:
        return 'Модель';
      case 1:
        return 'Фотограф';
    }
  }
}
