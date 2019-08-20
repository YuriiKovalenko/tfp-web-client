import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../../core/services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly photoService: PhotoService
  ) {}

  ngOnInit() {
    this.user = this.route.parent.snapshot.data.user;
  }

  public async uploadPhoto(event: any) {
    const photo = event.source.files[0];
    const upload = await this.photoService.uploadPhoto(photo);
    upload.subscribe(newPhoto => this.user.gallery.photos.unshift(newPhoto));
  }
}
