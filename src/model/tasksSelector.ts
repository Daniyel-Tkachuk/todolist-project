import {AppRootStateType} from "../state/store";
import {TasksStateType} from "../state/reducers/tasks-reducer";

export const selectTasks = (state: AppRootStateType):TasksStateType => state.tasks;