/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { prepare } from './db';
import { jobService } from './job.service';
import { runner } from './runner';

prepare();

const app = express();

app.get('/', (_req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});

app.post('/v1/jobs', async (req, res) => {
  const input = req.body;
  const job = await jobService.create(input);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  runner.run();
  res.send(job);
});

app.get('/v1/jobs/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const job = await jobService.get(id);
  res.send(job);
});

app.get('/v1/jobs', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const jobs = await jobService.paginate(page, limit);
  res.send(jobs);
});

app.delete('/v1/jobs/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await jobService.delete(id);
  res.send({ deleted: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
