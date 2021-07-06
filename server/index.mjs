import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log('listening on port: ', port));
