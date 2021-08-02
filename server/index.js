import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import multer from 'multer';
import connection from '../threekit/connection';
import api from '../threekit/api';

dotenv.config();

const threekitConfig = {
  authToken: process.env.THREEKIT_PRIVATE_TOKEN,
  orgId: process.env.THREEKIT_PRIVATE_TOKEN,
  assetId: process.env.THREEKIT_ASSET_ID,
  threekitEnv: process.env.THREEKIT_ENV,
};

connection.connect(threekitConfig);

//  Port setup
const argv = process.argv.slice(2);
const portIdx =
  argv.indexOf('--port') !== -1 ? argv.indexOf('--port') : argv.indexOf('-p');
const PORT = process.env.PORT || (portIdx > 0 ? argv[portIdx + 1] : 5000);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
  res.status(200).send({ message: 'server healthy!' });
});

app.post('/api/snapshot', upload.single('files'), async (req, res) => {
  const file = req.file;
  const [response, error] = await api.files.save(file);
  if (error) {
    console.log(error.config);
    res.status(500).send(error);
    return;
  }

  const output = {
    ...response.files[0],
    url: `https://${threekitConfig.threekitEnv}/api/files/${response.files[0].id}/content`,
  };

  res.status(200).send(output);
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => console.log('listening on port: ', PORT));
