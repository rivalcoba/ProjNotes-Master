import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import winston from '@s-config/winston';

// Getting RootDir
const rootDir = process.cwd();
// Function to process Temaplate
function processingTemaplate(view, viewModel) {
  const source = fs.readFileSync(
    path.join(rootDir, 'server', 'mails', `${view}.hbs`),
    'utf-8',
  );
  const template = Handlebars.compile(source);
  const htmlContent = template(viewModel);
  return htmlContent;
}
// Class
class MailSender {
  // Class constructor
  constructor(options) {
    if (!options) throw new Error('Need options to create a Mail Sender');
    this.transporter = nodemailer.createTransport(options);
    this.mail = {
      from: '',
      to: '',
      subject: '',
      text: '',
      html: '',
    };
  }

  // Methods
  async sendMail(view, viewModel, text) {
    // Input Checking
    if (!view || !viewModel || !text)
      throw new Error('Need to provide "view" and "viewModel"');
    // Mail Checking
    if (this.from === '' || this.to === '' || this.subject === '')
      throw new Error('Mail info is incomplete');
    try {
      this.mail.html = processingTemaplate(view, viewModel);
      this.mail.text = text;
      return this.transporter.sendMail(this.mail);
    } catch (error) {
      winston.info(`Error: ${error.message}`);
      return null;
    }
  }
}

export default MailSender;
