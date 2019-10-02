import React from 'react'
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import Budget from "./view/budget-page/Budget";
// import Home from "./view/home-page/Home"

ReactDOM.render(
   <ThemeProvider>
      <CssBaseline />
      <Budget />
   </ThemeProvider>,
   document.querySelector('#root') 
)