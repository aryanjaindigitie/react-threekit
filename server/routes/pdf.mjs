import express from 'express';
import pdf from '../pdf-templates/index.mjs';
import testData from '../pdf-templates/test-data.json';

const router = express.Router();

router.route('/dev').get(async (req, res) => {
  const pdfData = await pdf.compile(testData, 'template-01');

  try {
    res.set({ 'Content-type': 'application/pdf' });
    res.end(pdfData);
  } catch (e) {
    console.log(e);
  }
});

router.route('/').post(async (req, res) => {
  const data = req.body;
  if (!data) return res.status(422).send();

  const pdfData = await pdf.compile(data, 'template-01');

  try {
    res.set(
      Object.assign(
        {
          'Content-type': 'application/pdf',
        },
        req.query.download === 'true'
          ? {
              'Content-Disposition':
                'attachment;filename=threekit-configuration.pdf',
            }
          : {}
      )
    );
    res.end(pdfData);
  } catch (e) {
    console.log(e);
  }
});

export default router;
