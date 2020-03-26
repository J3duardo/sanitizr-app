import React from "react";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const NavBar = () => {
  return (
    <AppBar className="app-bar" position="fixed">
      <div style={{width: "100%", maxWidth: "1200px", margin: "0 auto"}}>
        <Toolbar>
          <IconButton>
            <Typography variant="h5">
              <Link to="/">
                <span style={{fontWeight: 700, color: "#fff"}}>Sanitizr App</span>
              </Link>
            </Typography>
          </IconButton>
          <Button style={{marginLeft: "auto"}}>
            <Link to="/contact">
              <span style={{fontWeight: 400, color: "#fff"}}>Contáctame</span>
            </Link>
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default NavBar;
