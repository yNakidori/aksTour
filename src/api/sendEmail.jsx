import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .send({ message: "Todos os campos são obrigatórios" });
  }

  // Configurar o transporte do Nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtplw.com.br", // Servidor SMTP da Locaweb
    port: 587, // Porta recomendada para envio autenticado
    secure: false, // true para SSL, false para TLS
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail personalizado (ex.: contato@seudominio.com.br)
      pass: process.env.EMAIL_PASS, // Sua senha
    },
    tls: {
      rejectUnauthorized: false, // Permite certificados autoassinados
    },
  });

  // Configuração do e-mail
  const mailOptions = {
    from: email,
    to: "contato@akstur.com.br",
    subject: `Nova mensagem de ${firstName} ${lastName}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).send({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).send({ message: "Erro ao enviar e-mail" });
  }
}
