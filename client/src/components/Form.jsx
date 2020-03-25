import React, {useState} from "react";
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "./Modal";

import HelpIcon from "@material-ui/icons/Help";
import InputAdornment from "@material-ui/core/InputAdornment";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const styles = (theme) => ({
  formContainer: {
    width: "90%",
    maxWidth: "500px",
    margin: "0 auto"
  },
  formTitle: {
    textAlign: "center",
    margin: "1.5rem 0 3rem 0"
  },
  checkboxesContainer: {
    marginBottom: "1.5rem",
    borderBottom: "1px solid lightgrey"
  },
  field: {
    marginBottom: "1.5rem"
  },
})

const Form = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("info");
  const [type, setType] = useState("hands");
  const [quantity, setQuantity] = useState("");
  const [concentration, setConcentration] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Especificar el tipo de modal
  const selectTypeHandler = (e) => {
    setType(e.target.value)
  }

  // Especificar la cantidad de solución a preparar
  const quantityHandler = (e) => {
    setErrors({
      ...errors,
      quantity: null
    })
    setQuantity(e.target.value)
  }

  // Especificar la concentración de la solución inicial
  const concentrationHandler = (e) => {
    setErrors({
      ...errors,
      concentration: null
    })
    setConcentration(e.target.value)
  }

  // Validar formulario
  const validator = () => {
    const errors = {}
  
    if(quantity === "" || typeof parseInt(quantity) !== "number") {
      errors.quantity = "Debe especificar la cantidad de solución a preparar"
    }
  
    if(concentration === "" || typeof parseInt(concentration) !== "number") {
      errors.concentration = "Debe especificar la concentración de la solución inicial."
    }

    return errors;
  }

  // Realizar el cálculo
  const calculate = async () => {
    const check = Object.keys(validator());

    if(check.length > 0) {
      return setErrors(validator())
    }

    setErrors({
      quantity: undefined,
      concentration: undefined
    });

    setLoading(true);

    const response = await axios({
      method: "POST",
      url: "/calculate",
      data: {
        quantity,
        concentration,
        type
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })

    setLoading(false);
    
    // Volumen requerido de la solución inicial
    const volReq = response.data.volReq;
    
    // Mostrar los resultados en el modal
    setResults(`Diluir ${volReq.toFixed(1)} ml de solución de hipoclorito (cloro) en ${(quantity - volReq).toFixed(1)} ml de agua para preparar ${quantity} ml de ${type === "surfaces" ? "desinfectante para superficies." : "antiséptico para manos."}`);

    setDialogType("results");

    setOpenDialog(true);
  }

  // Abrir/cerrar el modal
  const openDialogHandler = (bool, type) => {
    setDialogType(type);
    setOpenDialog(bool);
  }

  return (
    <div className={props.classes.formContainer}>
      <Modal open={openDialog} modalType={dialogType} isOpen={openDialogHandler} textContent={results}/>
        <Grid container>
          <Grid item>
            <Typography className={props.classes.formTitle} variant="h4">Calculadora de hipoclorito para producción de antiséptico.</Typography>
            <Paper style={{padding: "1rem 1.5rem 1.5rem 1.5rem"}}>
              <form noValidate>
                <div className={props.classes.checkboxesContainer}>
                  <Typography variant="h6">
                    Elija el tipo de solución a preparar:
                    <Tooltip title="Más información" onClick={() => openDialogHandler(true, "info")}>
                      <IconButton>
                        <HelpIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControlLabel
                    control = {
                      <Checkbox
                        checked={type === "hands"}
                        onChange={selectTypeHandler}
                        color="secondary"
                        name="hands"
                        value="hands"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                    label="Para manos"
                  />
                  <FormControlLabel
                    control = {
                      <Checkbox
                        checked={type === "surfaces"}
                        onChange={selectTypeHandler}
                        name="surfaces"
                        value="surfaces"
                        color="secondary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    }
                    label="Para superficies"
                  />
                </div>
                <TextField
                  fullWidth
                  variant="outlined"
                  className={props.classes.field}
                  type="number"
                  name="quantity"
                  label="Cantidad de solución a preparar (ml)"
                  value={quantity}
                  onChange={quantityHandler}
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Más información" onClick={() => openDialogHandler(true, "quantity")}>
                          <IconButton>
                            <HelpIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  className={props.classes.field}
                  type="number"
                  name="concentration"
                  label="Concentración de la solución inicial (%)"
                  value={concentration}
                  onChange={concentrationHandler}
                  error={!!errors.concentration}
                  helperText={errors.concentration}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Más información" onClick={() => openDialogHandler(true, "concentration")}>
                          <IconButton>
                            <HelpIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  onClick={calculate}
                  startIcon={<OpenInNewIcon />}
                >
                  {loading &&
                    <CircularProgress color="primary" size="1.5rem" thickness={5}/>
                  }
                  Calcular!
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
    </div>
  );
}

export default withStyles(styles)(Form);
