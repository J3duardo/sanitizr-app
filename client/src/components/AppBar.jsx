import React from "react";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const NavBar = (props) => {
  return (
    <AppBar className="app-bar" position="fixed">
      <div style={{width: "100%", maxWidth: "1200px", margin: "0 auto"}}>
        <Toolbar>
          <IconButton style={{borderRadius: "5px"}} onClick={() => props.history.push("/")}>
            <Typography variant="h5" style={{fontWeight: 700, color: "#fff"}}>
              Sanitizr App
            </Typography>
          </IconButton>
          <Button
            style={{padding: "15px 10px", marginLeft: "auto", fontWeight: 400, color: "#fff"}}
            onClick={() => props.history.push("/contact")}
          >
            Contáctame
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default withRouter(NavBar);
