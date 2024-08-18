import 'dotenv/config'
import {MailtrapClient} from "mailtrap";
// const { MailtrapClient } = require("mailtrap");

let TOKEN = process.env.MAILTRAP_TOKEN;
let ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "amith",
};
const recipients = [
  {
    email: "amithwebdev@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);