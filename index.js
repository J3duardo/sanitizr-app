const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  });
}

app.post("/calculate", (req, res) => {
  let NaClO = null;
  let volReq = null;
  const {type, quantity, concentration} = req.body;

  if(type === "hands") {
    // Calcular la cantidad requerida de hipoclorito a partir de la cantidad a preparar
    // y la concentración recomendada del antiséptico para manos (0.05%)
    NaClO = parseFloat(quantity) * (0.05/100);

    // Calcular el volumen necesario de la solución inicial de NaClO
    volReq = NaClO * (100/parseFloat(concentration));

    return res.json({
      NaClO,
      volReq
    });

  } else if(type === "surfaces") {
    // Calcular la cantidad requerida de hipoclorito a partir de la cantidad a preparar
    // y la concentración recomendada del desinfectante de superficies (0.5%)
    NaClO = parseFloat(quantity) * (0.5/100);

    // Calcular el volumen necesario de la solución inicial de NaClO
    volReq = NaClO * (100/parseFloat(concentration));

    return res.json({
      NaClO,
      volReq
    })
  }
})

app.listen(port, (error) => {
  if(error) {
    throw error;
  }
  console.log(`Servidor corriendo en el puerto: ${port}`)
});