import { State } from '@ngrx/store';

import { UserLogged, UserDetailsActionTypes } from '../action/userDetails.action';
import { User } from '../../models/user.model';


export interface UserState {
    user: User;
}

export const initialUserState: UserState = {
    user: {
        id: '',
        name: '',
        email: '',
        image: '',
        token: '',
        role: '',
        preferences: {
            lang: '',
            generes: [],
            theaters: [],
        },
        rating: {
            movieId: '',
            rating: ''
        },
        bookings: [
            {
                bookingId: '',
                tid: '',
                tcity: '',
                tname: '',
                mname: '',
                mtime: '',
                seatNum: '',
                price: 0
            }
        ]
    }
};


export function userReducer(state = initialUserState, action: UserDetailsActionTypes) {
    switch (action.type) {
        case UserLogged.SET_USER: {
            let newUserState = { ...state.user };
            newUserState = action.payload;
            if (action.payload) {
                sessionStorage.setItem('authDetails', JSON.stringify(newUserState));
            }
            return {
                ...state,
                user: newUserState
            };
        }
        case UserLogged.REMOVE_USER: {
            return {
                ...state,
                user: initialUserState.user
            };
        }

        default:
            return state;
    }
}
