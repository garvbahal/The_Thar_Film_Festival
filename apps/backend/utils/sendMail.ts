import nodeMailer from "nodemailer";

const sendMail = async (email: string, title: string, body: string) => {
  try {
    let transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `HACKATHON ADMIN`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    return info;
  } catch (error) {
    console.log("Mail error: ", error);
  }
};

export default sendMail;
