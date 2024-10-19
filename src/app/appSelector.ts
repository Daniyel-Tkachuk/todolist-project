import {AppRootStateType} from "./store";

export const selectThemeMode = (state: AppRootStateType) => state.app.themeMode;