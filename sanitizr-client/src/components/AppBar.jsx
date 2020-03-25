import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <div style={{width: "100%", maxWidth: "1200px", margin: "0 auto"}}>
        <Toolbar>
          <Typography variant="h6">
            Sanitizr
          </Typography>
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default NavBar;
