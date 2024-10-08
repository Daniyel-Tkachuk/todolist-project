import { tasksReducer } from './reducers/tasks-reducer';
import { todolistsReducer } from './reducers/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {ThunkDispatch, thunk} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./reducers/app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// типизация dispatch для того чтобы принимал thunk
type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
export const useAppDispatch = useDispatch<AppDispatchType>;

// custom type for useSelector
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
