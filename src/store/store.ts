import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../reducers/todolistsReducer";
import {tasksReducer} from "../reducers/tasksReducer";

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer
});


export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;