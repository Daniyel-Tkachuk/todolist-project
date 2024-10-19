import {AppRootStateType} from "../../app/store";
import {TasksStateType} from "./tasksReducer";

export const selectTasks = (state: AppRootStateType):TasksStateType => state.tasks;