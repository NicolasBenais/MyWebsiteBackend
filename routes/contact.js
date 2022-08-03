const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send");
  }
});

router.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.fields;

  const mail = {
    from: name,
    to: process.env.GMAIL_USER,
    subject: `Contact Form Submission: ${subject}`,
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "error" });
    } else {
      res.json({ status: "Message sent" });
    }
  });
});
module.exports = router;
