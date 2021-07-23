import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';

//  Port setup
dotenv.config();
const argv = process.argv.slice(2);
const portIdx =
  argv.indexOf('--port') !== -1 ? argv.indexOf('--port') : argv.indexOf('-p');
const PORT = process.env.PORT || (portIdx > 0 ? argv[portIdx + 1] : 5000);

const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

//  React build
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => console.log('listening on port: ', PORT));
