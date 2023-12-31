import nodemailer from 'nodemailer';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Origin'],
  },
));

// Configurações do transporte para o Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Rota para enviar e-mails
app.post('/envia_emails.php', (req, res) => {
  console.log(req.body)

  const { tipo_servico,
    origem,
    nome,
    email,
    whatsapp,
    cidade,
    estado,
    id_unidade,
    email_unidade,
    nome_unidade, } = req.body;



  const mensagemEmail = `
    Tipo de Serviço: ${tipo_servico}
    Origem: ${origem}
    Nome: ${nome}
    E-mail: ${email}
    WhatsApp: ${whatsapp}
    Cidade: ${cidade}
    Estado: ${estado}
  `;

  // Configurações do e-mail
  const mailOptions = {
    from: process.env.EMAIL_HOST_USER,
    to: process.env.EMAIL_RECEIVED,
    subject: "Contato do site",
    text: mensagemEmail,
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.sendStatus(500).send(error.toString());
    }
    res.send('1');
  });
});


