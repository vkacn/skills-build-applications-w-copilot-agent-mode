import express from 'express';
import { API_PORT, getApiBaseUrl } from './config/apiBaseUrl.js';
import db from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = API_PORT;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  const baseUrl = getApiBaseUrl();

  res.json({ status: 'ok', baseUrl });
});

db.once('open', () => {
  app.listen(port, () => {
    console.log(`Octofit backend listening on ${getApiBaseUrl()}`);
  });
});
