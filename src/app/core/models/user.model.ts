import { Preferences } from 'src/app/core/models/preference.model';
import { Ratings } from 'src/app/core/models/rating.model';
import { Bookings } from './Bookings.model';

export interface User {
    uid: string;
    name: string;
    email: string;
    image: string;
    token: string;
    role: string;
    preferences: Preferences;
    rating: Ratings;
    bookings: Bookings[];
}
