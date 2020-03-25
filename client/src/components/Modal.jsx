import React, {useState, useEffect} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const Modal = (props) => {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  const closeDialogHandler = () => {
    setOpen(false);
    setTimeout(() => {
      props.isOpen(false);
    }, 300)
  }

  return (
    <Dialog
      className="dialog"
      open={open}
      onClose={closeDialogHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.modalType === "info" && "¿Qué diferencias hay entre ambos tipos de soluciones?"}
        {(props.modalType === "quantity" ||  props.modalType === "concentration") && "¿Qué significa este parámetro?"}
        {props.modalType === "results" && "Resultados:"}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          {props.modalType === "quantity" &&
            <p>La cantidad en mililitros que desea preparar de la solución.</p>
          }
          {props.modalType === "concentration" &&
            <p>La concentración de la solución de hipoclorito de sodio a partir de la cual va a preparar la solución seleccionada. Diferentes marcas poseen diferentes concentraciones y ésta normalmente se especifica en la etiqueta del envase. Normalmente varía entre 5% y 6.5%</p>
          }
          {props.modalType === "info" &&
            <React.Fragment>
              La solución de hipoclorito para manos posee una concentración menor (0.05%) para minimizar el riesgo de reacciones adversas en la piel, mientras que la solución para superficies posee una concentración de 0.5% (10 veces superior), lo que la hace adecuada para limpiar profundamente superficies contaminadas.
              <hr/>
              Estos cálculos están basados en un <a className="info-link" href="https://www.ncbi.nlm.nih.gov/pubmed/28231311" target="_blank" rel="noopener noreferrer">estudio realizado por el Departamento de Ingeniería Civil y Ambiental de la Universidad de Medford, Massachusetts, Estados Unidos de América</a>, en el cual se demostró la eficacia del <a className="info-link" href="https://es.wikipedia.org/wiki/Hipoclorito_de_sodio" target="_blank" rel="noopener noreferrer">hipoclorito de sodio</a> en la desactivación de diversos virus y microorganismos patógenos al emplearlo como producto antiséptico alternativo.
            </React.Fragment>            
          }
          {props.modalType === "results" && <strong>{props.textContent}</strong>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          color="secondary"
          onClick={closeDialogHandler}
        >
          <strong>OK</strong>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
