import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "../menuButton/menuButton";
import {Switch} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {changeThemeAC, ThemeMode} from "../../state/reducers/app-reducer";
import {getTheme} from "../../common/theme";
import {headerToolbarSX} from "./Header.style";

export const Header = () => {
   const themeMode = useAppSelector<ThemeMode>(state => state.app.themeMode);
   const dispatch = useAppDispatch();

   const theme = getTheme(themeMode);

   const changeModeHandler = () => {
      dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"));
   }

   return (
      <AppBar position="static">
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
      </AppBar>
   );
};
