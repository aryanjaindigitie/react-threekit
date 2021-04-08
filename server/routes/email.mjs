import express from 'express';
import {
  POSTMARK_TEMPLATE_ID,
  POSTMARK_TOKEN,
  POSTMARK_FROM,
} from '../constants.mjs';

const router = express.Router();
router.route('/').post(async (req, res) => {
  const { to, data } = req.body;

  if (!to?.length || !data)
    return res.status(422).json({ message: 'incomplete request data' });

  const postmarkData = {
    TemplateId: POSTMARK_TEMPLATE_ID,
    From: POSTMARK_FROM,
    To: to,
    TemplateModel: data,
  };

  try {
    const response = await axios.post(
      'https://api.postmarkapp.com/email/withTemplate',
      postmarkData,
      {
        headers: {
          'X-Postmark-Server-Token': POSTMARK_TOKEN,
        },
      }
    );
    res.status(response.status).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
