import React from "react";
import {MuiThemeProvider} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Form from "./components/Form";
import NavBar from "./components/AppBar";
import Footer from "./components/Footer";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#86afd4",
      main: "#4894d8",
      dark: "#19344c",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffae68",
      main: "#ff7e3b",
      dark: "#a93400",
      contrastText: "#fff"
    }
  }
})

const App = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="main-container">
        <NavBar />
        <div className="container">
          <Form />
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
