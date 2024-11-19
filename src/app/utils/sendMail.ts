/* eslint-disable @typescript-eslint/ban-ts-comment */
import nodemailer from "nodemailer";
import config from "../config";

type TAttachment = {
  filename: string;
  path: string;
  cid?: string;
  contentType?: string;
  content?: string;
};

type TEmail = {
  to: string;
  html: string;
  subject: string;
  from?: string;
  attachments?: TAttachment[];
};

export const sendMail = async ({ to, html, subject, from, attachments }: TEmail) => {
  const transporter = nodemailer.createTransport({
    //@ts-ignore
    host: "smtp.gmail.com",
    port: config.email.port,
    secure: config.NODE_ENV !== "development",
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
    attachments,
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: from || config.email.user, // sender address
    //from: "masumraihan3667@gmail.com", // sender address
    to,
    replyTo: from || config.email.user,
    subject,
    html,
  });
};
