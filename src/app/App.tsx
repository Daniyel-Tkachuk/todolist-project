import React from 'react'
import './App.css';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from '../state/store';
import {RequestStatusType, ThemeMode} from "../state/reducers/app-reducer";
import {ErrorSnackbar} from "../components/errorSnackbar/errorSnackbar";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {getTheme} from "../common/theme";
import {Header} from "../components/header/Header";
import {Main} from "../features/main/Main";

function App() {
   const status = useAppSelector<RequestStatusType>(state => state.app.status);
   const themeMode = useAppSelector<ThemeMode>(state => state.app.themeMode);

   const theme = getTheme(themeMode);

   return (
      <ThemeProvider theme={theme}>
         <ErrorSnackbar/>
         <CssBaseline/>
         <Header/>
         {status === "loading" && <LinearProgress color="secondary"/>}
         <Main/>
      </ThemeProvider>

   );
}

export default App;
