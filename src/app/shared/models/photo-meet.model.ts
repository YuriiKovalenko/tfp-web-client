import { User } from './user.model';

export interface PhotoMeet {
  id: string;
  photoMeetStatus: number;
  photoSetDate: Date;
  placeId: string;
  modelId: string;
  firstUserId: string;
  secondUserId: string;
  isPaid: boolean;
  paidTo: string;
  photographerId: string;
  user?: User;
}
