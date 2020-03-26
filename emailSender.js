const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = async (req, res) => {
  // Contenido del correo a enviar
  const emailData = {
    to: process.env.EMAIL_TO,
    from: req.body.email,
    subject: "Sanitizr App",
    text: `${req.body.message} \n Mensaje enviado por ${req.body.name}. \n Email: ${req.body.email}`,
    html: `
      <h4>Nuevo mensaje de:</h4>
      <p>${req.body.name}</p>
      <p>${req.body.email}</p>
      <hr/>
      <h4>Mensaje:</h4>
      <p>${req.body.message}</p>
      <hr/>
      <p>SeoBlog Team</p>
    `
  }

  try {
    await sendgridMail.send(emailData);
    res.json({
      status: "success",
      message: "Mensaje enviado con éxito"
    })
    
  } catch (error) {
    if(error.response && error.response.body) {
      return res.status(400).json({
        status: "failed",
        message: error.response.body.errors[0].message,
        error: {...error}
      })
    }
    res.status(500).json({
      status: "failed",
      message: "Error al enviar el mensaje",
      error: {...error}
    })
  }
}