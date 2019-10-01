import React from 'react'
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import Dashboard from "./Dashboard";

ReactDOM.render(
   <ThemeProvider>
      <CssBaseline />
      <Dashboard />
   </ThemeProvider>,
   document.querySelector('#root') 
)