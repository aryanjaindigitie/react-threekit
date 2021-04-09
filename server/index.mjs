import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

// import smsRoutes from "./routes/sms.mjs"
// import emailRoutes from "./routes/email.mjs"
// import pdfRoutes from './routes/pdf.mjs';

//  Port setup
const argv = process.argv.slice(2);
const portIdx =
  argv.indexOf('--port') !== -1 ? argv.indexOf('--port') : argv.indexOf('-p');
const PORT = process.env.PORT || portIdx !== -1 ? argv[portIdx + 1] : 5000;

const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

/**
 * Postmark based Email Service
 *
 * Requires environment variables:
 *    *  POSTMARK_TOKEN
 *    *  POSTMARK_TEMPLATE_ID
 *    *  POSTMARK_FROM
 *
 */
// app.use('/email', emailRoutes);

/**
 * Twilio based SMS service
 *
 * Requires packages:
 *    *  twilio
 *
 * Requires environment variables:
 *    *  TWILIO_ACCOUNT_SID
 *    *  TWILIO_AUTH_TOKEN
 *    *  TWILIO_FROM_PHONE_NUMBER
 *
 */
//  Twilio API based sms service
// app.use('/sms', smsRoutes);

/**
 * PDF Generator
 *
 * Requires packages:
 *    *  puppeteer
 *
 */
// app.use('/pdf', pdfRoutes);

//  React build
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => console.log('listening on port: ', PORT));
