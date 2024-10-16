import React from 'react'
import './App.css';
import {useAppSelector} from '../state/store';
import {ThemeMode} from "../state/reducers/app-reducer";
import {ErrorSnackbar} from "../components/errorSnackbar/errorSnackbar";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {getTheme} from "../common/theme";
import {Header} from "../components/header/Header";
import {Main} from "../features/main/Main";

export const App = () => {
   const themeMode = useAppSelector<ThemeMode>(state => state.app.themeMode);

   return (
      <ThemeProvider theme={getTheme(themeMode)}>
         <Header/>
         <Main/>

         <ErrorSnackbar/>
         <CssBaseline/>
      </ThemeProvider>
   );
}
