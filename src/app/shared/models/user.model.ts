import { Like } from './like.model';
import { PhotoMeet } from './photo-meet.model';
import { Contact } from './contact.model';
import { Gallery } from './gallery.model';

export interface User {
  id: string;
  email: string;
  name: string;
  lastname: string;
  country: string;
  city: string;
  rating: number;
  accountType: number;
  profileType: number;
  wasOnline: Date;
  isOnline: boolean;
  age: number;
  gender: number;
  photo: string;
  isLiked?: boolean;
  isLikedPaid?: boolean;
  likes?: Like[];
  likedMe?: Like[];
  photoMeets?: PhotoMeet[];
  contacts?: Contact[];
  gallery?: Gallery;
}
