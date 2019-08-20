import { User } from './user.model';
import { Photo } from './photo.model';

export interface Gallery {
  id: number;
  user: User;
  photos: Photo[];
}
