import React, {useState, useEffect} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SprayHandsImg from "../assets/spray-hands.jpg";
import SprayBottleImg from "../assets/spray-bottle.jpg";

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
            <span>La cantidad en mililitros que desea preparar de la solución.</span>
          }
          {props.modalType === "concentration" &&
            <span>La concentración de la solución de hipoclorito de sodio a partir de la cual va a preparar la solución seleccionada. Diferentes marcas poseen diferentes concentraciones y ésta normalmente se especifica en la etiqueta del envase. Normalmente varía entre 5% y 6.5%</span>
          }
          {props.modalType === "info" &&
            <React.Fragment>
              <span style={{display: "block", marginBottom: "1rem"}}>
                La solución de hipoclorito para manos posee una concentración menor (0.05%) para minimizar el riesgo de reacciones adversas en la piel, mientras que la solución para superficies posee una concentración de 0.5% (10 veces superior), lo que la hace adecuada para limpiar profundamente superficies contaminadas.
              </span>
              <span style={{display: "block"}}>Estos cálculos están basados en un <a className="info-link" href="https://www.ncbi.nlm.nih.gov/pubmed/28231311" target="_blank" rel="noopener noreferrer">estudio realizado por el Departamento de Ingeniería Civil y Ambiental de la Universidad de Medford, Massachusetts, Estados Unidos de América</a>, en el cual se demostró la eficacia del <a className="info-link" href="https://es.wikipedia.org/wiki/Hipoclorito_de_sodio" target="_blank" rel="noopener noreferrer">hipoclorito de sodio</a> en la desactivación de diversos virus y microorganismos patógenos al emplearlo como producto antiséptico alternativo.</span>
            </React.Fragment>            
          }
          {props.modalType === "results" &&
            <React.Fragment>
              <span style={{display: "block", marginBottom: "1rem"}}><strong>{props.textContent}</strong></span>
              <Typography component={"span"} variant="body1" style={{display: "block", marginBottom: "0.5rem"}}>
                <strong>Instrucciones de uso:</strong>
              </Typography>
              {props.textContent.includes("manos") &&
                <React.Fragment>
                  <span style={{display: "block", marginBottom: "1rem"}}>
                    Mezclar cuidadosamente las cantidades calculadas de hipoclorito de sodio y agua en un recipiente de plástico o vidrio. Para utilizarlo es recomendable el empleo de un rociador como el que se muestra en la imagen, rocíe sus manos con la solución, frote durante varios segundos y enjuague con abundante agua. Conservar en un lugar fresco y alejado de la luz solar. El producto tiene una duración de aproximadamente 4 a 6 semanas.
                  </span>
                  <img style={{display: "block", maxWidth: "100%", margin: "0 auto"}} src={SprayHandsImg} alt="Hands sprying"/>
                </React.Fragment>
              }
              {props.textContent.includes("superficies") &&
                <React.Fragment>
                <span style={{display: "block", marginBottom: "1rem"}}>
                  Mezclar cuidadosamente las cantidades calculadas de hipoclorito de sodio y agua en un recipiente de plástico o vidrio. Para utilizarlo es recomendable el empleo de un rociador como el que se muestra en la imagen, rocíe las superficies con la solución, espere unos minutos y limpie con una toalla. Puede utilizarlo para rociar las suelas de sus zapatos antes de entrar a su casa si lo considera necesario.
                </span>
                <span style={{display: "block", marginBottom: "1rem"}}>Debido a la naturaleza corrosiva del Hipoclorito de Sodio las superficies metálicas que no sen inoxidables pudieran resultar afectadas después del uso continuo, así como las fibras y colores de ciertas telas. Conservar en un lugar fresco y alejado de la luz solar. El producto tiene una duración de aproximadamente 4 a 6 semanas.</span>
                <img style={{display: "block", maxWidth: "100%", margin: "0 auto"}} src={SprayBottleImg} alt="Spray bottle"/>
              </React.Fragment>
              }
            </React.Fragment>
          }
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
