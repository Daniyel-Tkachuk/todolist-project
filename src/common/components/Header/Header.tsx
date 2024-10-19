import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "../MenuButton/MenuButton";
import {Switch} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {changeThemeAC, RequestStatusType} from "../../../app/appReducer";
import {getTheme} from "../../theme";
import {headerToolbarSX} from "./Header.style";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectThemeMode} from "../../../app/appSelector";

export const Header = () => {
   const themeMode = useAppSelector(selectThemeMode);
   const status = useAppSelector<RequestStatusType>(state => state.app.status);

   const dispatch = useAppDispatch()

   const theme = getTheme(themeMode);

   const changeModeHandler = () => {
      dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"));
   }

   return (
      <AppBar position="relative">
         <Toolbar sx={headerToolbarSX}>
            <IconButton edge="start" color="inherit" aria-label="menu">
               <Menu/>
            </IconButton>
            <div>
               <MenuButton>Login</MenuButton>
               <MenuButton>Logout</MenuButton>
               <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
               <Switch color="default" onChange={changeModeHandler}/>
            </div>
         </Toolbar>
         {status === "loading" && <LinearProgress color="secondary"/>}
      </AppBar>
   );
};
