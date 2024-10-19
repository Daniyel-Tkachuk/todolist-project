import React from 'react'
import './App.css';
import {ErrorSnackbar} from "../common/components";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {getTheme} from "../common/theme";
import {Header} from "../common/components";
import {Main} from "./Main";
import {selectThemeMode} from "./appSelector";
import {useAppSelector} from "../common/hooks";

export const App = () => {
   const themeMode = useAppSelector(selectThemeMode);

   return (
      <ThemeProvider theme={getTheme(themeMode)}>
         <Header/>
         <Main/>

         <ErrorSnackbar/>
         <CssBaseline/>
      </ThemeProvider>
   );
}
