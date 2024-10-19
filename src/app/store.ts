import { tasksReducer } from '../features/model/tasksReducer';
import { todolistsReducer } from '../features/model/todolistsReducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk} from 'redux-thunk';
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
