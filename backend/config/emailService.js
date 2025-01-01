const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mozakshitij@gmail.com",
    pass: "nlni qcfk mjur qloa",
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: "mozakshitij@gmail.com",
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };
