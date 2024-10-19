import {AppRootStateType} from "../../app/store";
import {TodolistDomainType} from "./todolistsReducer";

export const selectTodolists = (state: AppRootStateType): TodolistDomainType[] => state.todolists;