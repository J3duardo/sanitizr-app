import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const WelcomeScreen = (props) => {
  return (
    <React.Fragment>
      {!props.continueToApp &&
        <div className="welcome-screen">
          <div className="welcome-screen__text">
            <Typography style={{marginBottom: "1.5rem"}} variant="h2">Sanitizr App</Typography>
            <Typography style={{marginBottom: "1.5rem"}} variant="body1">
              Aplicación para la producción de antiséptico alternativo a base de Hipoclorito de Sodio comercial.
            </Typography>
          </div>
          <Button
            style={{fontWeight: 400}}
            variant="contained"
            color="secondary"
            onClick={props.exitWelcome}
          >
            Continuar
          </Button>
        </div>
      }
    </React.Fragment>
  );
}

export default WelcomeScreen;
