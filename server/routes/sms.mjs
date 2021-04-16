import express from 'express';
import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_PHONE_NUMBER = process.env.TWILIO_FROM_PHONE_NUMBER;

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
