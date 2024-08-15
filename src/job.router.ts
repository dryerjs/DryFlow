/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { jobService } from './job.service';
import { runner } from './runner';

export const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call

router.post('/', async (req, res) => {
  const input = req.body;
  const job = await jobService.create(input);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  runner.run();
  res.send(job);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const job = await jobService.get(id);
  res.send(job);
});

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const jobs = await jobService.paginate(page, limit);
  res.send(jobs);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await jobService.delete(id);
  res.send({ deleted: true });
});
