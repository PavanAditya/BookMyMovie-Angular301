import { Action } from '@ngrx/store';
import { Theater } from '../../../home/models/theater.model';

export enum AdminActionTypes {
    ADD_THEATERS = '[ Admin ] Add New Theaters'
}

export class AddTheaters implements Action {
    readonly type = AdminActionTypes.ADD_THEATERS;

    constructor(public payload: Theater[]) {}
}
export type AdminActions = AddTheaters;
