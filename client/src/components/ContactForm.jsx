import React, {useState} from "react";
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  formContainer: {
    width: "90%",
    maxWidth: "600px",
    margin: "0 auto",

    [theme.breakpoints.down(450)]: {
      width: "100%"
    }
  },
  field: {
    marginBottom: "1.5rem"
  },
})


const ContactForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    nombre: null,
    email: null,
    message: null,
    submit: null
  })

  const nameHandler = (e) => {
    setErrors({
      ...errors,
      name: null
    })
    setName(e.target.value)
  }

  const emailHandler = (e) => {
    setErrors({
      ...errors,
      email: null
    })
    setEmail(e.target.value)
  }  
  
  const messageHandler = (e) => {
    setErrors({
      ...errors,
      message: null
    })
    setMessage(e.target.value)    
  }

  // Validar email
  const isEmail = (email) => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
    if(email.match(regExp)) {
      return true
    }
  
    return false
  }

  // Validar campos
  const validator = () => {
    const errors = {}

    // Validar nombre
    if(name === "") {
      errors.name = "Debe agregar su nombre"
    }

    // Validar email
    if(!isEmail(email)) {
      errors.email = "Debe agregar un email válido"
    }

    // Validar mensaje
    if(message.length < 10) {
      errors.message = "El mensaje debe contener al menos 10 caracteres"
    }

    return errors;
  }

  // Enviar mensaje
  const sendMessageHandler = async () => {
    // Checkear errores de validación
    const check = Object.keys(validator());

    if(check.length > 0) {
      return setErrors(validator())
    }

    // Enviar el mensaje si todo es correcto
    try {
      setLoading(true);
      
      const res = await axios({
        method: "POST",
        url: "/contact",
        data: {
          name,
          email,
          message
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      
    } catch (error) {
      setLoading(false);
      setErrors({
        ...errors,
        submit: error.message
      })
      console.log(error.message)
      console.log({...error})
    }
  }

  return (
    <div className={props.classes.formContainer}>
      <Grid container>
        <Typography style={{marginBottom: "1.5rem"}} variant="h4">Contáctame</Typography>
      </Grid>
      <form noValidate>
        <TextField
          fullWidth
          className={props.classes.field}
          variant="outlined"
          className={props.classes.field}
          type="text"
          name="name"
          label="Introduzca su nombre"
          value={name}
          onChange={nameHandler}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          className={props.classes.field}
          variant="outlined"
          className={props.classes.field}
          type="email"
          name="email"
          label="Introduzca su email"
          value={email}
          onChange={emailHandler}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          multiline
          rows={7}
          className={props.classes.field}
          variant="outlined"
          className={props.classes.field}
          type="text"
          name="message"
          label="Introduzca el mensaje"
          value={message}
          onChange={messageHandler}
          error={!!errors.message}
          helperText={errors.message}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={sendMessageHandler}
        >
          {loading &&
            <CircularProgress color="primary" size="1.5rem" thickness={5}/>
          }
          Enviar
        </Button>
      </form>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)} >
        <Alert elevation={6} variant="filled" severity="success">
          ¡Mensaje enviado correctamente!
        </Alert>
      </Snackbar>
      <Snackbar open={errors.submit} autoHideDuration={6000} onClose={() => setErrors({...errors, submit: null})} >
        <Alert elevation={6} variant="filled" severity="error">
          Ocurrió un error al enviar el mensaje.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withStyles(styles)(ContactForm);
