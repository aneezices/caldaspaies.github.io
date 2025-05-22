const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'teste.ane001@gmail.com', 
    pass: 'teste12345678'
  }
});

app.post('/send-email', (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  const mailOptions = {
    from: email,
    to: 'teste.ane001@gmail.com', 
    subject: `Mensagem de ${nome}`,
    text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao enviar o e-mail.', details: error.message });
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});