import {AppRootStateType} from "../state/store";
import {TodolistDomainType} from "../state/reducers/todolists-reducer";

export const selectTodolists = (state: AppRootStateType): TodolistDomainType[] => state.todolists;