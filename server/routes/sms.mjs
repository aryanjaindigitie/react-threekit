import express from 'express';
import twilio from 'twilio';
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_PHONE_NUMBER,
} from './constants.mjs';

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const router = express.Router();

router.route('/').post(async (req, res) => {
  const { to, message } = req.body;

  if (!to?.length || !message?.length)
    return res.status(422).json({ message: 'incomplete request data' });

  try {
    const smsResponse = await client.messages.create({
      from: TWILIO_FROM_PHONE_NUMBER,
      to,
      body: message,
    });
    res.status(200).send(smsResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

export default router;
