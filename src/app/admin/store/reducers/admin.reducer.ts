import { AdminActionTypes, AdminActions } from '../actions/admin.action';
import { State } from '@ngrx/store';
import { Theater } from '../../../home/models/theater.model';
export interface AdminState {
    theaters: Theater[];
}

export const initialMovieState: AdminState = {
    theaters: []
};

export function adminReducer(state = initialMovieState, action: AdminActions) {
    switch (action.type) {
        case AdminActionTypes.ADD_THEATERS: {
            const newSetTheatersState = action.payload;
            return {
                ...state,
                theaters: newSetTheatersState
            };
        }
        default:
            return state;
    }
}
